"use strict";
var suggestionMessages = [
    "Hello! how can we help you?",
    "Hello!",
    "Thank you for using service!",
  ],
  total_messages = 0,
  close_img_src = chrome.runtime.getURL("assets/closeBtn.png");
chrome.storage.local.get(
  "blurToggleAll blurAllMessageToggle blurLastMesssageToggle blurMediaPreviewToggle blurMediaGallaryToggle blurTextInputToggle blurProfilePictureToggle blurGroupUserNameToggle noTransitionDelayToggle unblurAllToggle suggestionMessages".split(
    " "
  ),
  function (a) {
    function b(d) {
      let e;
      (e = document.getElementById(d)) && e.parentNode.removeChild(e);
    }
    function c(d) {
      if (!document.getElementById(d)) {
        var e = document.createElement("link");
        e.id = d;
        e.className = "pfwa";
        e.href = chrome.runtime.getURL("css/addon-css/" + d + ".css");
        e.type = "text/css";
        e.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(e);
      }
    }
    a.blurAllMessageToggle ? c("messages") : b("messages");
    a.blurLastMesssageToggle ? c("messagesPreview") : b("messagesPreview");
    a.blurMediaPreviewToggle ? c("mediaPreview") : b("mediaPreview");
    a.blurMediaGallaryToggle ? c("mediaGallery") : b("mediaGallery");
    a.blurTextInputToggle ? c("textInput") : b("textInput");
    a.blurProfilePictureToggle ? c("profilePic") : b("profilePic");
    a.blurGroupUserNameToggle ? c("name") : b("name");
    a.noTransitionDelayToggle ? c("noDelay") : b("noDelay");
    a.unblurAllToggle ? c("unblurActive") : b("unblurActive");
    a.suggestionMessages && (suggestionMessages = a.suggestionMessages);
    setInterval(() => {
      (document.getElementById("reply_div") &&
        suggestionMessages.length === total_messages) ||
        suggestion_messages();
    }, 2e3);
  }
);
function suggestion_messages() {
  var a = document.getElementById("reply_div");
  a && a.parentNode.removeChild(a);
  var b = document.getElementById("smart_reply_edit_button");
  b && b.parentNode.removeChild(b);
  if ((b = document.querySelector("footer"))) {
    b.style.paddingTop = "40px";
    a = document.createElement("div");
    a.id = "reply_div";
    a.style.position = "absolute";
    a.style.padding = "8px 12px 0px 12px";
    a.style.top = "0";
    a.style.zIndex = "1";
    a.style.width = "calc(100% - 100px)";
    a.style.whiteSpace = "nowrap";
    a.style.overflowX = "scroll";
    b.style.backgroundColor = "var(--rich-text-panel-background)";
    $.each(suggestionMessages, function (c, d) {
      c = d;
      47 < d.length && (c = d.substring(0, 47) + "...");
      d = $(
        $.parseHTML(
          '<button class="reply_click CtaBtn" style="color: var(--message-primary);background-color: var(--outgoing-background);border-radius: 15px;padding: 4px 8px;font-size: 12px;margin-right: 8px;margin-bottom: 4px;" value="' +
            d +
            '">' +
            c +
            "</button>"
        )
      );
      a.appendChild(d[0]);
    });
    total_messages = suggestionMessages.length;
    b.appendChild(a);
    document
      .getElementsByClassName("copyable-area")[0]
      .lastChild.scrollBy(0, 40);
    b.appendChild(
      $(
        $.parseHTML(
          '<button class="CtaBtn" style="position: absolute;width: 80px;right: 8px;top: 12px;color: var(--message-primary);font-size: 12px !important;" id="smart_reply_edit_button">Edit</button>'
        )
      )[0]
    );
    if ((b = document.getElementsByClassName("_33LGR")[0]))
      b.scrollTop = b.scrollHeight;
    document
      .getElementById("reply_div")
      .addEventListener("click", async function (c) {
        c = c.target.value;
        void 0 != c && sendSuggestionMessage(c);
      });
    document
      .getElementById("smart_reply_edit_button")
      .addEventListener("click", function (c) {
        suggestion_popup();
      });
  }
}
var sendSuggestionMessage = async (a) => {
  if (a) {
    a = a.replace(/<span class='ql-cursor'>.*?<\/span>/g, "");
    var b = document.querySelectorAll("[contenteditable='true']")[1];
    new Event("Input", { bubbles: !0, cancelable: !0, composed: !0 });
    b &&
      void 0 != b &&
      (await send_ChatText(a),
      setTimeout(async function () {
        await eventFire(
          document.querySelector('span[data-icon="send"]'),
          "click"
        );
        "" ===
          document.querySelectorAll("[contenteditable='true']")[1].innerHTML &&
          setTimeout(async function () {
            await sendMessage(a);
          }, 500);
      }, 200));
  }
};
function send_ChatText(a) {
  const b = new DataTransfer();
  b.setData("text", a);
  a = new ClipboardEvent("paste", { clipboardData: b, bubbles: !0 });
  document
    .querySelector(
      '#main .copyable-area [contenteditable="true"][role="textbox"]'
    )
    .dispatchEvent(a);
}
function referesh_messages() {
  var a = document.getElementById("sugg_message_list");
  a.innerHTML = "";
  $.each(suggestionMessages, function (b, c) {
    b = $(
      $.parseHTML(
        '<div style="margin: 8px 0px;display: flex;"><div class="popup_list_message" style="color: var(--message-primary);background-color: var(--outgoing-background);padding: 6px 7px 8px 9px;border-radius: 7.5px;margin: 2px 0px;max-width: 400px;margin-right: 8px;cursor: pointer;overflow: auto;">' +
          c +
          '</div><button class="delete_message CtaDeleteBtn" style="border: 1px solid red;width: 18px;height: 18px;color: red;border-radius: 50%;font-size: 11px;margin-top: 8px;" value="' +
          c +
          '">X</button></div>'
      )
    );
    a.appendChild(b[0]);
  });
  chrome.storage.local.set({ suggestionMessages });
}
function suggestion_popup() {
  if (document.getElementsByClassName("modal")[0])
    document.getElementsByClassName("modal")[0].style.display = "block";
  else {
    var a = document.createElement("div");
    a.className = "modal";
    var b = document.createElement("div");
    b.className = "modal-content";
    b.style.position = "relative";
    b.style.width = "600px";
    b.style.maxHeight = "560px";
    b.style.overflow = "auto";
    a.appendChild(b);
    document.querySelector("body").appendChild(a);
    b.appendChild(
      $(
        $.parseHTML(
          '<div style="font-weight: bold;font-size: 20px;text-align: center;margin-bottom: 24px;color: #000;">Edit/Add quick replies</div>'
        )
      )[0]
    );
    a = document.createElement("div");
    a.id = "sugg_message_list";
    a.style.height = "210px";
    a.style.overflowY = "auto";
    a.style.margin = "16px 0px";
    b.appendChild(a);
    referesh_messages();
    b.appendChild(
      $(
        $.parseHTML(
          '<span id="close_edit" class="CtaCloseBtn" style="position: absolute;top: 6px;right: 6px;font-size: 20px;width:14px"><img  class="CtaCloseBtn" src="' +
            close_img_src +
            '" style="width: 100%;" alt="x"></span>'
        )
      )[0]
    );
    b.appendChild(
      $(
        $.parseHTML(
          '<textarea style="width: 400px;height: 100px;padding: 8px;" type="text" id="add_message" placeholder="Type your quick reply here"></textarea>'
        )
      )[0]
    );
    b.appendChild(
      $(
        $.parseHTML(
          '<button class="CtaBtn" style="background: #62D9C7;border-radius: 2px;padding: 8px 12px;float: right;color: #fff;" id="add_message_btn">Add Template</button>'
        )
      )[0]
    );
    document
      .getElementById("close_edit")
      .addEventListener("click", function (c) {
        document.getElementsByClassName("modal")[0].style.display = "none";
      });
    document
      .getElementById("sugg_message_list")
      .addEventListener("click", async function (c) {
        var d = c.target.value;
        "div" != c.target.localName
          ? ((c = suggestionMessages.indexOf(d)),
            suggestionMessages.splice(c, 1),
            referesh_messages())
          : "div" == c.target.localName &&
            "popup_list_message" == c.target.className &&
            ((document.getElementsByClassName("modal")[0].style.display =
              "none"),
            (c = c.target.innerHTML),
            void 0 != c && sendSuggestionMessage(c));
      });
    document
      .getElementById("add_message_btn")
      .addEventListener("click", function (c) {
        c = document.getElementById("add_message").value;
        "" !== c &&
          (suggestionMessages.push(c),
          referesh_messages(),
          (document.getElementById("add_message").value = ""));
      });
  }
}
