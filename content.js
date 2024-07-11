/*
 jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
"use strict";
(function () {
  let a = document.createElement("script");
  a.setAttribute("type", "text/javascript");
  a.setAttribute("id", "inject");
  a.src = chrome.runtime.getURL("js/inject.js");
  a.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(a);
})();
let myNumber = null,
  url = "https://wamessager-backend.onrender.com",
  currentState = { state: "STOP" };
window.onload = function () {
  try {
    if (window.localStorage.getItem("last-wid")) {
      var a = window.localStorage.getItem("last-wid");
      myNumber = a.split("@")[0].substring(1);
    } else
      (a = window.localStorage.getItem("last-wid-md")),
        (myNumber = a.split(":")[0].substring(1));
    chrome.storage.local.set({ currentState });
  } catch (b) {}
};
if (!document.getElementById("wamessager")) {
  const a = document.createElement("a");
  a.id = "wamessager";
  document.body.append(a);
}
let stopSending = !1,
  pauseSending = !1;
var rows = [["Phone Number", "Result"]],
  replace_pattern = /{{(.*?)}}/g,
  coloumn_pattern = /[^{\{]+(?=}\})/g,
  stop = !1,
  total_count = 0;
let continueFunction = null;
function pauser() {
  return new Promise((a) => {
    continueFunction = function () {
      pauseSending = !1;
      continueFunction = null;
      currentState = { ...currentState, state: "SEND" };
      chrome.storage.local.set({ currentState }, () => {
        a("resolved");
      });
    };
  });
}
chrome.runtime.onMessage.addListener((a, b, c) => {
  receiver(a, b, c);
  return !0;
});
async function receiver(a, b, c) {
  if (["pv", "cn", "doc"].includes(a.mediaType))
    sendMultimedia(a.mediaType), c();
  else if ("hello" == a.greeting)
    c({ number: myNumber, date: new Date().toDateString() });
  else if ("continue" === a.context.process_state) {
    b = a.context.message;
    var e = [];
    if (a.context.is_custom_message) {
      let h = a.context.execl_coloumn;
      if (h) {
        for (const [k, l] of Object.entries(h[0]))
          b = b.replaceAll("{{" + l + "}}", "{{" + k + "}}");
        for (
          var d = b.match(coloumn_pattern), q = b.match(replace_pattern), p = 1;
          p < h.length;
          p++
        ) {
          var n = b;
          if (null != d && null != q)
            for (let k = 0; k < d.length; k++)
              n = n.replace(q[k], h[p][d[k]] || "");
          e.push(n);
        }
        sendAny(
          a.context.numbers,
          e,
          h,
          a.context.is_image,
          a.context.timeDelayFrom,
          a.context.timeDelayTo,
          a.context.is_time_stamp,
          a.context.batch_size,
          a.context.batch_delay,
          a.context.batched
        );
      } else {
        for (d = 0; d < a.context.numbers.length; d++) e.push(b);
        sendAny(
          a.context.numbers,
          e,
          null,
          a.context.is_image,
          a.context.timeDelayFrom,
          a.context.timeDelayTo,
          a.context.is_time_stamp,
          a.context.batch_size,
          a.context.batch_delay,
          a.context.batched
        );
      }
    } else {
      a.context.numbers = a.context.numbers.filter((h) => h);
      for (d = 0; d < a.context.numbers.length; d++) e.push(b);
      sendAny(
        a.context.numbers,
        e,
        null,
        a.context.is_image,
        a.context.timeDelayFrom,
        a.context.timeDelayTo,
        a.context.is_time_stamp,
        a.context.batch_size,
        a.context.batch_delay,
        a.context.batched
      );
    }
    c();
  } else if ("true" === a.context.export_results) export_results(), c();
  else if ("true" === a.context.filter_numbers)
    (rows = [["Phone Number", "Result"]]), filter_numbers(a.arr), c();
  else if (a.context.process_state) {
    switch (a.context.process_state) {
      case "PAUSE":
        pauseSending = !0;
        break;
      case "CONTINUE":
        continueFunction();
        break;
      case "STOP":
        (stopSending = !0), pauseSending && continueFunction();
    }
    c();
  } else
    a.context.get_contacts
      ? (window.addEventListener("wam:get-contacts-ready", function l(k) {
          removeEventListener("wam:get-contacts-ready", l);
          c(k.detail);
        }),
        window.dispatchEvent(new CustomEvent("wam:get-contacts"), {}))
      : a.context.contactSupport
      ? (await openChat(a.context.supportNumber),
        (b = document.getElementById("wamessager")),
        b ||
          ((b = document.createElement("a")),
          (b.id = "wamessager"),
          document.body.append(b)),
        b.setAttribute(
          "href",
          "https://api.whatsapp.com/send?phone=" +
            a.context.supportNumber +
            "&text=Hello%2C%20I%20need%20some%20help%20with%20WAMessager"
        ),
        b.click(),
        b.remove(),
        await sleep(500),
        await clickElements(document.querySelector('span[data-icon="send"]')),
        c())
      : a.context.download_group
      ? (downloadContacts(
          a.context.exportType,
          a.context.groupIds,
          a.context.isAllGroupSelected,
          a.context.listOption,
          a.context.groupList,
          a.context.chatList,
          a.context.labelList
        ),
        c())
      : a.context.installed
      ? c()
      : a.context.downloadExcelTemplate && (downloadExcelTemplate(), c());
}
async function filter_numbers(a) {
  currentState = (await chrome.storage.local.get("currentState")).currentState;
  let b = a;
  a = a.map((c) => c.toString().replace(/\D/g, "").replace(/^0+/, ""));
  for (let c = 0; c < a.length; c++) {
    currentState = { ...currentState, msgCount: c, msgTotal: a.length };
    await chrome.storage.local.set({ currentState }, () => {
      chrome.runtime.sendMessage({
        subject: "progress-bar-filter",
        from: "content",
        count: c,
        total: a.length,
      });
    });
    pauseSending &&
      ((currentState = { ...currentState, state: "PAUSE" }),
      await chrome.storage.local.set({ currentState }),
      await pauser());
    if (stopSending) {
      stopSending = !1;
      break;
    }
    if ("" == a[c] || 5 > a[c].length || 20 < a[c].length)
      rows.push([b[c], "Invalid"]);
    else {
      let e = await openChat(a[c]);
      rows.push([b[c], e ? "Valid" : "Invalid"]);
    }
  }
  currentState = { ...currentState, state: "STOP" };
  await chrome.storage.local.set({ currentState }, () => {
    chrome.runtime.sendMessage({
      subject: "progress-bar-filter",
      from: "content",
      count: a.length,
      total: a.length,
    });
    export_results();
  });
}
async function clickOnElements(a) {
  let b = document.createEvent("MouseEvents");
  b.initEvent("mouseover", !0, !0);
  const c = document.querySelector(a).dispatchEvent(b);
  b.initEvent("mousedown", !0, !0);
  document.querySelector(a).dispatchEvent(b);
  b.initEvent("mouseup", !0, !0);
  document.querySelector(a).dispatchEvent(b);
  b.initEvent("click", !0, !0);
  document.querySelector(a).dispatchEvent(b);
  return c
    ? new Promise((e) => {
        e();
      })
    : await clickOnElements(a);
}
async function clickMediaIcon(a) {
  let b = null;
  "pv" === a
    ? (b = '[data-icon="attach-image"]')
    : "doc" === a
    ? (b = '[data-icon="attach-document"]')
    : "cn" === a && (b = '[data-icon="attach-contact"]');
  b && (await clickOnElements(b));
}
async function sendMultimedia(a) {
  try {
    (hasOpenedSelf = await openChat(myNumber)),
      await clickOnElements('[data-testid="clip"] svg'),
      await clickMediaIcon(a);
  } catch (b) {}
}
function chunk(a, b) {
  if (0 >= b) throw "Invalid chunk size";
  for (var c = [], e = 0, d = a.length; e < d; e += b)
    c.push(a.slice(e, e + b));
  return c;
}
async function sendAny(a, b, c, e, d, q, p, n, h, k) {
  0 !== b.length && core_sending(a, b, c, e, d, q, a.length, p, n, h, k);
}
async function core_sending(a, b, c, e, d, q, p, n, h, k, l) {
  let g = 0;
  currentState = (await chrome.storage.local.get("currentState")).currentState;
  for (let f = 0; f < a.length; f++) {
    a[f] = a[f].toString().replace(/\D/g, "").replace(/^0+/, "");
    currentState = { ...currentState, msgCount: f, msgSent: g, msgTotal: p };
    await chrome.storage.local.set({ currentState }, () => {
      chrome.runtime.sendMessage({
        subject: "progress-bar-sent",
        from: "content",
        count: f,
        sent: g,
        total: p,
      });
    });
    pauseSending &&
      ((currentState = { ...currentState, state: "PAUSE" }),
      await chrome.storage.local.set({ currentState }),
      await pauser());
    if (stopSending) {
      stopSending = !1;
      break;
    }
    if ("" != a[f]) {
      var m = null;
      0 != f &&
        ((m = parseInt(d) + Math.floor(Math.random() * (q - d))),
        await sleep(1e3 * m));
      l && 0 != f && 0 == f % parseInt(h)
        ? await sleep(1e3 * parseInt(k))
        : 0 != f && 0 == f % 10 && (await sleep(1e4));
      m = !1;
      try {
        4 < a[f].length && 21 > a[f].length && (m = await openChat(a[f]));
      } catch (v) {
        m = !1;
      }
      if (m) {
        var t = isUnsubscribed();
        if (t) rows.push([a[f], "User has unsubscribed"]);
        else {
          b[f] = b[f].trim();
          if (
            m &&
            !t &&
            "" != b[f] &&
            document.querySelectorAll("[contenteditable='true']")[1]
          )
            try {
              n && (b[f] += "\n\nSent at: " + new Date().toISOString()),
                await sendText(b[f], a[f], 0),
                rows.push([a[f], "Message sent"]),
                g++;
            } catch (v) {
              console.log("error while sending to: ", a[f], v);
              rows.push([a[f], "Some Error Please Try This Number Again"]);
              continue;
            }
          if (e) {
            let v;
            try {
              let r = await chrome.storage.local.get("attachment_data");
              v = document
                .querySelectorAll("div[data-id]")[0]
                .getAttribute("data-id")
                .split("@")[0]
                .split("_")[1];
              if ((r = r?.attachment_data))
                for (let w = 0; w < r.length; w++) {
                  await sleep(1e3);
                  if (c) {
                    let u = r[w].fileCaption;
                    for (const [B, z] of Object.entries(c[0]))
                      u = u.replaceAll("{{" + z + "}}", "{{" + B + "}}");
                    var x = u.match(coloumn_pattern),
                      A = u.match(replace_pattern);
                    m = u;
                    if (null != x && null != A)
                      for (t = 0; t < x.length; t++)
                        m = m.replace(A[t], c[f + 1][x[t]] || "");
                    r[w].fileCaption = m;
                  }
                  await new Promise((u) => {
                    window.addEventListener(
                      "wam:attachments-sent",
                      function C(z) {
                        removeEventListener("wam:attachments-sent", C);
                        u();
                      }
                    );
                    window.dispatchEvent(
                      new CustomEvent("wam::send-attachments", {
                        detail: { attachment: r[w], number: v },
                      })
                    );
                  });
                }
              let y = rows[rows.length - 1];
              y && y[0] == a[f]
                ? (rows[rows.length - 1][1] = y[1] + " & Media Sent")
                : rows.push([a[f], "Media sent"]);
            } catch (r) {
              console.log("ERROR in sending media to", v, r);
            }
          }
        }
      } else rows.push([a[f], "Invalid number"]);
    }
  }
  currentState = { ...currentState, state: "STOP" };
  await chrome.storage.local.set({ currentState }, () => {
    chrome.runtime.sendMessage({
      subject: "progress-bar-sent",
      from: "content",
      count: p,
      sent: g,
      total: p,
    });
    export_results();
  });
  0 < g &&
    ((a = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: myNumber, messagesSent: g }),
    }),
    fetch(`${url}/api/user/updateUsedMessages`, a).then().catch(),
    (a = (await chrome.storage.local.get("DAILY_MSG_LEFT")).DAILY_MSG_LEFT),
    chrome.storage.local.set({ DAILY_MSG_LEFT: a - g }));
}
async function sendMedia(a) {
  await sleep(500);
  a.click();
}
async function openChat(a) {
  await openChatUrl(a);
  await sleep(1e3);
  return await hasOpened();
}
async function openChatUrl(a) {
  let b = document.getElementById("wamessager");
  b ||
    ((b = document.createElement("a")),
    (b.id = "wamessager"),
    document.body.append(b));
  b.setAttribute("href", `https://api.whatsapp.com/send?phone=${a}`);
  await sleep(500);
  b.click();
}
async function hasOpened() {
  await waitTillWindow();
  let a = document.querySelector('[data-animate-modal-popup="true"]');
  await sleep(500);
  return a ? (a.querySelector("button").click(), !1) : !0;
}
async function waitTillWindow() {
  document.querySelector('[data-animate-modal-popup="true"]') &&
    document
      .querySelector('[data-animate-modal-popup="true"]')
      .querySelector("span") &&
    (await sleep(500), await waitTillWindow());
}
var numbers = [];
async function download_group() {
  var a = document.querySelector('div[title="Search\u2026"]').parentElement
      .parentElement.parentElement.parentElement.children[1].lastElementChild
      .textContent,
    b = document.querySelector('div[title="Search\u2026"]').parentElement
      .parentElement.parentElement.parentElement.children[1].firstElementChild
      .textContent;
  if (
    "online" !== a &&
    "typing..." !== a &&
    "check here for contact info" !== a &&
    "" !== a &&
    !a.includes("last seen")
  ) {
    var c = [["Numbers"]];
    a.split(",").forEach((d) => {
      d = d.toString().replace(/\D/g, "");
      "" != d && ((arr = []), arr.push(d), c.push(arr));
    });
    a = "data:text/csv;charset=utf-8," + c.map((d) => d.join(",")).join("\n");
    a = encodeURI(a);
    var e = document.createElement("a");
    e.setAttribute("href", a);
    e.setAttribute("download", b + ".csv");
    document.body.appendChild(e);
    e.click();
  }
}
function downloadExcelTemplate() {
  var a = [],
    b = {
      whatsappNumber: "+919999988888",
      name: "WAM",
      anyField: "Best WA Message Bulk Sender",
    };
  a.push(b);
  b = { whatsappNumber: "+8613119140503", name: "Name 1", anyField: "WAM" };
  a.push(b);
  b = { whatsappNumber: "+8613119140503", name: "Name 2", anyField: "WAM" };
  a.push(b);
  b = {
    whatsappNumber: "+8615829292527",
    name: "Name 3",
    anyField: "WAMessager",
  };
  a.push(b);
  b = XLSX.utils.json_to_sheet(a);
  a = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(a, b, "excel template");
  XLSX.utils.sheet_add_aoa(
    b,
    [
      [
        "WhatsApp Number( with country code)",
        "Name (Optional)",
        "Custome Field (Optional)",
      ],
    ],
    { origin: "A1" }
  );
  b = Math.round(new Date().getTime());
  XLSX.writeFile(a, "excelTemplate" + b + ".xlsx");
}
function downloadContacts(a, b, c, e, d, q, p) {
  let n = [];
  "Group" == a
    ? (c || (d = d.filter((h) => b.includes(h.groupId))),
      d.forEach((h) => {
        h.members.forEach((k, l) => {
          let g = {};
          if (!(5 > k.phoneNumber.length)) {
            try {
              [g.CountryCode, g.Country] = findCountryDetail(k.phoneNumber, l);
            } catch (m) {}
            g.CountryCode = "+" + g.CountryCode;
            g.displayName = k.displayName;
            g.phoneNumber = k.phoneNumber;
            g.savedName = k.savedName;
            g.groupName = h.groupName;
            n.push(g);
          }
        });
      }))
    : "Label" == a
    ? ((d = p),
      c || (d = d.filter((h) => b.includes(h.groupId))),
      d.forEach((h) => {
        h.members.forEach((k, l) => {
          let g = {};
          if (!(5 > k.phoneNumber.length)) {
            try {
              [g.CountryCode, g.Country] = findCountryDetail(k.phoneNumber, l);
            } catch (m) {
              console.log(m);
            }
            g.CountryCode = "+" + g.CountryCode;
            g.displayName = k.displayName;
            g.phoneNumber = k.phoneNumber;
            g.savedName = k.savedName;
            g.groupName = h.groupName;
            n.push(g);
          }
        });
      }))
    : "Chat" == a &&
      q.forEach((h, k) => {
        let l = {};
        if (!(5 > h.members[0].phoneNumber.length)) {
          try {
            [l.CountryCode, l.Country] = findCountryDetail(
              h.members[0].phoneNumber,
              k
            );
          } catch (g) {
            console.log(g);
          }
          l.CountryCode = "+" + l.CountryCode;
          l.displayName = h.members[0].displayName;
          l.phoneNumber = h.members[0].phoneNumber;
          l.savedName = h.members[0].savedName;
          l.groupName = h.groupName;
          "unsavedChats" == e ? l.isMyContact || n.push(l) : n.push(l);
        }
      });
  d = XLSX.utils.json_to_sheet(n);
  d["!cols"] = [
    { wch: 15 },
    { wch: 15 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];
  c = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(c, d, "myWorkSheet");
  XLSX.utils.sheet_add_aoa(
    d,
    [
      [
        "Country Code",
        "Country",
        "Contact's Public Display Name",
        "Phone Number",
        "Saved Name",
        a + " Name",
      ],
    ],
    { origin: "A1" }
  );
  d = Math.round(new Date().getTime());
  XLSX.writeFile(c, a + d + ".xlsx");
}
function findCountryDetail(a, b) {
  try {
    let c = libphonenumber.parsePhoneNumber("+" + a);
    return [c.countryCallingCode, c.country];
  } catch (c) {
    throw c;
  }
}
function open_chat_details() {
  var a = document.evaluate(
    '//*[@id="main"]/header/div[2]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  document.evaluate(
    '//*[@id="app"]//div[contains(text(), "Group info")]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue || a.click();
}
async function eventFire(a, b) {
  var c = document.createEvent("MouseEvents");
  c.initMouseEvent(b, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
  return new Promise(function (e) {
    var d = setInterval(function () {
      document.querySelector('span[data-icon="send"]') &&
        (a.dispatchEvent(c), e((clearInterval(d), "BUTTON CLICKED")));
    }, 500);
  });
}
function isUnsubscribed() {
  try {
    var a = document.querySelector('div[data-tab="8"]');
    return null === a || null === a.lastElementChild
      ? !1
      : -1 !==
          a.lastElementChild.textContent
            .toLowerCase()
            .substring(0, 5)
            .indexOf("unsub");
  } catch (b) {
    return !1;
  }
}
function export_results() {
  var a =
    "data:text/csv;charset=utf-8," + rows.map((c) => c.join(",")).join("\n");
  a = encodeURI(a);
  var b = document.createElement("a");
  b.setAttribute("href", a);
  b.setAttribute("download", "Report.csv");
  document.body.appendChild(b);
  b.click();
  b.remove();
  rows = [["Phone Number", "Result"]];
}
async function clickElements(a) {
  let b = document.createEvent("MouseEvents");
  b.initEvent("mouseover", !0, !0);
  const c = a.dispatchEvent(b);
  b.initEvent("mousedown", !0, !0);
  a.dispatchEvent(b);
  b.initEvent("mouseup", !0, !0);
  a.dispatchEvent(b);
  b.initEvent("click", !0, !0);
  a.dispatchEvent(b);
  return c
    ? new Promise((e) => {
        e();
      })
    : await clickOnElements(a);
}
async function sendText(a, b, c) {
  try {
    a = a.replace(/ /gm, " ");
    const e = document.getElementById("wamessager");
    e
      ? e.setAttribute(
          "href",
          `https://wa.me/${b}?text=${encodeURIComponent(a)}`
        )
      : document.body.append(
          `<a href="https://wa.me/${b}?text=${a}" id= "wamessager"></a>`
        );
    document.getElementById("wamessager").click();
    await sleep(500);
    await clickElements(document.querySelector('span[data-icon="send"]'));
  } catch (e) {
    await sleep(5e3);
    if (2 == c) throw e;
    await sendText(a, b, c + 1);
  }
}
async function send_both(a, b) {
  send_image();
  "complete" === document.readyState && sendText(a, b);
}
async function sleep(a) {
  await chrome.runtime.sendMessage({ context: "sleep", time: a });
}
