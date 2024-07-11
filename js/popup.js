"use strict";
document.addEventListener("DOMContentLoaded", async function () {
  function sa() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }).then(async (a) => {
      let b = a[0].id;
      await chrome.tabs.sendMessage(
        b,
        { greeting: "hello" },
        async function (c) {
          void 0 !== c && null != c.number
            ? ((ka = c.number),
              (la = c.date),
              await chrome.identity.getProfileUserInfo(async function (d) {
                d
                  ? d.id
                    ? ((ma = d.email), await ta(ma, ka, la))
                    : ($("#loadingScreen").hide(),
                      $("#unsynced").show(),
                      $("#synced").hide())
                  : ($("#reload").show(),
                    $("#reloadTab").click((e) => {
                      chrome.tabs.reload(d);
                      window.close();
                    }),
                    $("#loadingScreen").hide());
              }))
            : ($("#reload").show(),
              $("#reloadTab").click((d) => {
                chrome.tabs.reload(b);
                window.close();
              }),
              $("#loadingScreen").hide());
        }
      );
    });
  }
  async function ta(a, b, c) {
    c = new Headers();
    c.append("Content-Type", "application/json");
    a = JSON.stringify({ email: a, phoneNumber: b });
    fetch("https://wamessager-backend.onrender.com/api/user/createUser", {
      method: "POST",
      headers: c,
      body: a,
      redirect: "follow",
    })
      .then((d) => d.json())
      .then(async (d) => {
        console.log(d);
        await chrome.storage.local.set({ phoneNumber: b });
        N = d.supportNumber;
        O = d.onboardingNumber || N;
        await ua();
        $("#defaultOpen").text(chrome.i18n.getMessage("tabHome"));
        $("#Collaborators").text(chrome.i18n.getMessage("tabTeam"));
        $("#Premium").text(chrome.i18n.getMessage("tabPremium"));
        $("#Tutorials").text(chrome.i18n.getMessage("tabTutorials"));
        $("#execlSheetBtnText").text(chrome.i18n.getMessage("uploadExcelBtn"));
        $("#downloadExcelTemplateText").text(
          chrome.i18n.getMessage("downloadTemplateBtn")
        );
        $("#filter_numbersText").text(chrome.i18n.getMessage("filterBtn"));
        $("#download_membersText").text(
          chrome.i18n.getMessage("downloadGroupBtn")
        );
        $("#options_divText").text(chrome.i18n.getMessage("options_divText"));
        $("#sheet_select_text").text(
          chrome.i18n.getMessage("sheet_select_text")
        );
        $("#excel_from_text").text(chrome.i18n.getMessage("excel_from_text"));
        $("#excel_to_text").text(chrome.i18n.getMessage("excel_to_text"));
        $("#for_formatting_text").text(
          chrome.i18n.getMessage("for_formatting_text")
        );
        $("#for_formatting_text2").text(
          chrome.i18n.getMessage("for_formatting_text")
        );
        U = chrome.i18n.getMessage("numberPlaceholder");
        na = chrome.i18n.getMessage("numberPlaceholderDisabled");
        $("#sorted-number-filterText").text(
          chrome.i18n.getMessage("sortedNumberFilterText")
        );
        $("#DownloadGroupHeadingText").text(
          chrome.i18n.getMessage("downloadGroupHeadingText")
        );
        $("#exportGroupText").text(chrome.i18n.getMessage("exportGroupText"));
        $("#export-group").text(chrome.i18n.getMessage("exportGroup"));
        $("#selectAllGroupsText").text(
          chrome.i18n.getMessage("selectAllGroupsText")
        );
        $("#export-from-listText").text(
          chrome.i18n.getMessage("exportFromListText")
        );
        $("#export-list").text(chrome.i18n.getMessage("exportList"));
        $("#allChatsText").text(chrome.i18n.getMessage("allChatsText"));
        $("#unsavedChatsText").text(chrome.i18n.getMessage("unsavedChatsText"));
        $("#downloadGroupCloseBtnText").text(
          chrome.i18n.getMessage("downloadGroupCloseBtnText")
        );
        $("#clear").text(chrome.i18n.getMessage("clear"));
        $("#messageSettingsText").text(
          chrome.i18n.getMessage("messageSettingsText")
        );
        $("#send_attachmentsText").text(
          chrome.i18n.getMessage("send_attachmentsText")
        );
        $("#unsubscribe_optionText").text(
          chrome.i18n.getMessage("unsubscribe_optionText")
        );
        $("#addTimeStamp_optionTextCaption").html(
          chrome.i18n.getMessage("addTimeStamp_optionText")
        );
        $("#addTimeStamp_optionText").html(
          chrome.i18n.getMessage("addTimeStamp_optionText")
        );
        $("#custom_divText").text(chrome.i18n.getMessage("custom_divText"));
        $("#custom_divText_attachment").text(
          chrome.i18n.getMessage("custom_divText")
        );
        $("#timer-checkboxText").text(
          chrome.i18n.getMessage("timerCheckboxText")
        );
        $("#message-lineText").text(chrome.i18n.getMessage("msgLineText"));
        $("#message-overflow-text").text(
          chrome.i18n.getMessage("msgOverflowText")
        );
        $("#error-text").text(chrome.i18n.getMessage("errortext"));
        $("#addTemplateText").text(chrome.i18n.getMessage("addTemplateText"));
        $("#planInfoText").text(chrome.i18n.getMessage("planInfoText"));
        $("#supportFooter").text(chrome.i18n.getMessage("supportFooter"));
        $("#SupportTutorial").text(chrome.i18n.getMessage("supportFooter"));
        $("#pauseBtnText").text(chrome.i18n.getMessage("pauseBtnText"));
        $("#continueBtnText").text(chrome.i18n.getMessage("continueBtnText"));
        $("#stopBtnText").text(chrome.i18n.getMessage("stopBtnText"));
        $("#sendBtnText").text(chrome.i18n.getMessage("sendBtnText"));
        $("#reportBtnText").text(chrome.i18n.getMessage("reportBtnText"));
        $("#addMemberHeadingText").text(
          chrome.i18n.getMessage("addMemberHeadingText")
        );
        $("#addMemberBtnText").text(chrome.i18n.getMessage("addMemberBtnText"));
        $("#teamMemberNameText").text(
          chrome.i18n.getMessage("teamMemberNameText")
        );
        $("#teamMemberPhoneNumberText").text(
          chrome.i18n.getMessage("teamMemberPhoneNumberText")
        );
        $("#RemoveMemberText").text(chrome.i18n.getMessage("RemoveMemberText"));
        $("#getPremiumHeading").text(
          chrome.i18n.getMessage("getPremiumHeading")
        );
        $("#getPremium1").text(chrome.i18n.getMessage("getPremium1"));
        $("#getPremium2").text(chrome.i18n.getMessage("getPremium2"));
        $("#getPremium3").text(chrome.i18n.getMessage("getPremium3"));
        $("#getPremium4").text(chrome.i18n.getMessage("getPremium4"));
        $("#getPremium5").text(chrome.i18n.getMessage("getPremium5"));
        $("#getPremium6").text(chrome.i18n.getMessage("getPremium6"));
        $("#getPremium7").text(chrome.i18n.getMessage("getPremium7"));
        $("#getPremium8").text(chrome.i18n.getMessage("getPremium8"));
        $("#buypremium1").text(chrome.i18n.getMessage("tabPremium"));
        $(".premmium_feature").text(chrome.i18n.getMessage("premmium_feature"));
        $(".template_premmium_feature").text(
          chrome.i18n.getMessage("template_premmium_feature")
        );
        $("#firstMessageText").text(chrome.i18n.getMessage("firstMessageText"));
        $("#firstMessageReadyText").text(
          chrome.i18n.getMessage("firstMessageReadyText")
        );
        $("#onboardingMessage").html(
          chrome.i18n.getMessage("onboardingMessage")
        );
        $("#onboardingSendText").text(
          chrome.i18n.getMessage("onboardingSendText")
        );
        $(".chardinjs-tooltiptext").text(
          chrome.i18n.getMessage("onboardingSendIntro")
        );
        $("#syncMsgText").text(chrome.i18n.getMessage("syncMsgText"));
        $("#syncMessageNote").text(chrome.i18n.getMessage("syncMessageNote"));
        $("#uncheck_attachment").text(
          chrome.i18n.getMessage("uncheck_attachment")
        );
        $("#imageAttmntText").text(chrome.i18n.getMessage("imageAttmntText"));
        $("#docAttmntText").text(chrome.i18n.getMessage("docAttmntText"));
        $("#contactAttmntText").text(
          chrome.i18n.getMessage("contactAttmntText")
        );
        $("#timeGapText").text(chrome.i18n.getMessage("timeGapText"));
        $("#timeGapSeconds").text(chrome.i18n.getMessage("timeGapSeconds"));
        $("#timeGapRandomText").text(
          chrome.i18n.getMessage("timeGapRandomText")
        );
        $("#msgSentDisplayText").text(
          chrome.i18n.getMessage("msgSentDisplayText")
        );
        $("#addTeamMemberNote").text(
          chrome.i18n.getMessage("addTeamMemberNote")
        );
        $("#addMemberModalName").text(
          chrome.i18n.getMessage("teamMemberNameText")
        );
        $("#addMemberModalNumber").text(
          chrome.i18n.getMessage("teamMemberPhoneNumberText")
        );
        $("#addMemberAddBtnText").text(
          chrome.i18n.getMessage("addMemberAddBtnText")
        );
        $("#removeTeamMemberButton").text(
          chrome.i18n.getMessage("removeTeamMemberButton")
        );
        $("#memberName").attr(
          "placeholder",
          chrome.i18n.getMessage("addTeamMemberPlaceholder")
        );
        $("#memberPhone").attr(
          "placeholder",
          chrome.i18n.getMessage("addTeamMemberPhonePlaceholder")
        );
        $("#EnhancementSettings").text(
          chrome.i18n.getMessage("EnhancementSettings")
        );
        $("#blurToggleAllText").text(
          chrome.i18n.getMessage("blurToggleAllText")
        );
        $("#blurToggleAllText")
          .parent()
          .attr("title", chrome.i18n.getMessage("blurToggleAllTextTitle"));
        $("#blurAllMessageToggleText").text(
          chrome.i18n.getMessage("blurAllMessageToggleText")
        );
        $("#blurAllMessageToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurAllMessageToggleTextTitle")
          );
        $("#blurLastMesssageToggleText").text(
          chrome.i18n.getMessage("blurLastMesssageToggleText")
        );
        $("#blurLastMesssageToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurLastMesssageToggleTextTitle")
          );
        $("#blurMediaPreviewToggleText").text(
          chrome.i18n.getMessage("blurMediaPreviewToggleText")
        );
        $("#blurMediaPreviewToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurMediaPreviewToggleTextTitle")
          );
        $("#blurMediaGallaryToggleText").text(
          chrome.i18n.getMessage("blurMediaGallaryToggleText")
        );
        $("#blurMediaGallaryToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurMediaGallaryToggleTextTitle")
          );
        $("#blurTextInputToggleText").text(
          chrome.i18n.getMessage("blurTextInputToggleText")
        );
        $("#blurTextInputToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurTextInputToggleTextTitle")
          );
        $("#blurProfilePictureToggleText").text(
          chrome.i18n.getMessage("blurProfilePictureToggleText")
        );
        $("#blurProfilePictureToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurProfilePictureToggleTextTitle")
          );
        $("#blurGroupUserNameToggleText").text(
          chrome.i18n.getMessage("blurGroupUserNameToggleText")
        );
        $("#blurGroupUserNameToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurGroupUserNameToggleTextTitle")
          );
        $("#noTransitionDelayToggleText").text(
          chrome.i18n.getMessage("noTransitionDelayToggleText")
        );
        $("#noTransitionDelayToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("noTransitionDelayToggleTextTitle")
          );
        $("#unblurAllToggleText").text(
          chrome.i18n.getMessage("unblurAllToggleText")
        );
        $("#unblurAllToggleText")
          .parent()
          .attr("title", chrome.i18n.getMessage("unblurAllToggleTextTitle"));
        $("#reviewFooter").text(chrome.i18n.getMessage("reviewFooter"));
        $("#Enhancement").text(chrome.i18n.getMessage("Enhancement"));
        $("#attachmentAddButton").text(
          chrome.i18n.getMessage("attachmentAddButton")
        );
        $("#attachmentFileName").text(
          chrome.i18n.getMessage("attachmentFileName")
        );
        $("#attachmentFileType").text(
          chrome.i18n.getMessage("attachmentFileType")
        );
        $("#attachmentFileCaption").text(
          chrome.i18n.getMessage("attachmentFileCaption")
        );
        $("#attachmentFileAction").text(
          chrome.i18n.getMessage("attachmentFileAction")
        );
        $(".fileEdit").text(chrome.i18n.getMessage("attachmentEditAction"));
        $(".fileDelete").text(chrome.i18n.getMessage("attachmentDeleteAction"));
        $("#attachmentNote").text(chrome.i18n.getMessage("attachmentNote"));
        $("#file_input_help").text(chrome.i18n.getMessage("file_input_help"));
        $("#attachment_modal_file_name_text").text(
          chrome.i18n.getMessage("attachment_modal_file_name_text")
        );
        $("#attachment_modal_file_type_text").text(
          chrome.i18n.getMessage("attachment_modal_file_type_text")
        );
        $("#attachment_caption").text(
          chrome.i18n.getMessage("attachment_caption")
        );
        $("#attachment_modal_file_caption").attr(
          "placeholder",
          chrome.i18n.getMessage("attachment_modal_file_caption_placeholder")
        );
        $("#attachment_modal_submit").text(
          chrome.i18n.getMessage("attachment_modal_submit")
        );
        $("#msg_preview_text").text(chrome.i18n.getMessage("msg_preview_text"));
      })
      .catch((d) => {
        $("#loadingScreenLoader").hide();
        $("#loadingScreenErrorMessage").css("display", "flex");
      });
  }
  async function oa() {
    function a() {
      chrome.tabs.query({ active: !0, currentWindow: !0 }).then((g) => {
        chrome.tabs.sendMessage(
          g[0].id,
          { context: { get_contacts: "true" } },
          (h) => {
            k = h.groupList;
            x = h.chatList;
            F = h.labelList;
            f.setChoices(
              k.map((r) => ({ value: r.groupId, label: r.groupName })),
              "value",
              "label",
              "false"
            );
          }
        );
      });
    }
    function b(g, h, r, A) {
      chrome.tabs.query({ active: !0, currentWindow: !0 }).then((V) => {
        chrome.tabs.sendMessage(V[0].id, {
          context: {
            download_group: "true",
            exportType: g,
            groupIds: h,
            isAllGroupSelected: r,
            listOption: A,
            groupList: k,
            chatList: x,
            labelList: F,
          },
        });
      });
    }
    let c = await n("phoneNumber");
    var d = {
        url: `${"https://wamessager-backend.onrender.com"}/api/user/getUser?phoneNumber=${
          c.phoneNumber
        }`,
        method: "GET",
        timeout: 0,
      },
      e = chrome.runtime.getManifest();
    $("#myNumber").text("+" + c.phoneNumber);
    $("#myNumber2").text("+" + c.phoneNumber);
    $("#myVersion").show();
    $("#myVersion").text("V~" + e.version);
    $.ajax(d)
      .done(async function (g) {
        if (g.success) {
          console.log(g, "console-log g");
          $("#loadingScreen").hide();
          $("#onboarding,#unsynced").hide();
          $("#synced").show();
          p = g.user;
          q = true;
          var h = p.planhistory[p.planhistory.length - 1],
            r = p.collaborators;
          g.parentPhoneNumber &&
            ($("#adminNumber").show(),
            $("#adminNumber").html(
              chrome.i18n.getMessage("adminNumber", [g.parentPhoneNumber])
            ));
          if (q) {
            g = new Date(g.planEndDate) - new Date();
            g = Math.ceil(g / 864e5);
            let A = "<b> PREMIUM</b>";
            $("#messageCountDiv").css("font-size", "20px");
            $("#premiumUser").show();
            $("#nonPremiumUser").hide();
            $("#planInfo").html(A);
            $("#messageCount").html(`<strong>${p.messagesSent}</strong>`);
            $("#dailyLimitDiv").hide();
            $("#extMessageCount").text(
              chrome.i18n.getMessage("extMessageCount")
            );
          } else
            (E = void 0 != p.freeMsgLimit ? p.freeMsgLimit : y),
              $("#Premium").css(
                "animation",
                "horizontal-shaking 1s 5s infinite"
              ),
              $("#extMessageCount").text(
                chrome.i18n.getMessage("extMessageCountDailyCount")
              ),
              $("#dailyMsgReset").text(chrome.i18n.getMessage("dailyMsgReset")),
              void 0 == (await n("DAILY_MSG_LEFT")).DAILY_MSG_LEFT ||
              (await n("DAILY_MSG_LEFT")).DAILY_MSG_LEFT > E
                ? await l({ DAILY_MSG_LEFT: E })
                : (y = (await n("DAILY_MSG_LEFT")).DAILY_MSG_LEFT),
              y == E && (await l({ DAILY_MSG_LATEST_TIMESTAMP: H })),
              void 0 ==
              (await n("DAILY_MSG_LATEST_TIMESTAMP")).DAILY_MSG_LATEST_TIMESTAMP
                ? await l({ DAILY_MSG_LATEST_TIMESTAMP: H })
                : (H = (await n("DAILY_MSG_LATEST_TIMESTAMP"))
                    .DAILY_MSG_LATEST_TIMESTAMP),
              (g = (Date.now() - H) / 36e5),
              (g = 24 - g),
              0 >= g
                ? ((H = Date.now()),
                  (y = E),
                  await l({ DAILY_MSG_LEFT: E }),
                  await l({ DAILY_MSG_LATEST_TIMESTAMP: H }),
                  $("#dailyMsgResetTime").text("24 Hrs"))
                : y == E
                ? $("#dailyMsgResetTime").text("24 Hrs")
                : 1 < g
                ? $("#dailyMsgResetTime").text(
                    Math.floor(g) + " hr " + Math.floor((60 * g) % 60) + " min"
                  )
                : $("#dailyMsgResetTime").text(Math.ceil(60 * g) + " min"),
              $("#messageCount").html(`<strong>${y}</strong>`),
              setTimeout(() => {
                va();
              }, 1e4),
              $("#input").attr("disabled", !0),
              $("#input")
                .parent()
                .closest("label")
                .removeClass("bg-green-700 hover:bg-green-900"),
              $("#input").parent().closest("label").addClass("bg-gray-700"),
              $("#input")
                .parent()
                .closest("label")
                .attr(
                  "title",
                  "This is a premium feature, subscribe to plan to use this"
                ),
              $("#uploadExcelPremiumBadge").css("display", ""),
              $("#download_members").attr("disabled", !0),
              $("#download_members").removeClass(
                "bg-green-700 hover:bg-green-900"
              ),
              $("#download_members").addClass("bg-gray-700"),
              $("#download_members").attr(
                "title",
                "This is a premium feature, subscribe to plan to use this"
              ),
              $("#DownloadGroupPremiumBadge").css("display", "");
          await l({ mainUser: p });
          h = h.usageQuantityAllowed[0];
          r = r.length;
          0 != r ? $("#noteamMember").hide() : $("#noteamMember").show();
          $("#memberCount").html(chrome.i18n.getMessage("memberCount", [r, h]));
          q
            ? 0 == h
              ? ($("#noteamMember").text("Upgrade plan to add team members"),
                $("#addMember").attr("disabled", !0))
              : r >= h && $("#addMember").attr("disabled", !0)
            : ($("#noteamMember").text("Buy Premium to add team members"),
              $("#addMember").attr("disabled", !0));
          wa(p);
        } else $("#loadingScreenLoader").hide(), $("#loadingScreenErrorMessage").css("display", "flex");
      })
      .catch(() => {
        $("#loadingScreenLoader").hide();
        $("#loadingScreenErrorMessage").css("display", "flex");
      });
    let f = new Choices("#choices-multiple-remove-button", {
      removeItemButton: !0,
      placeholder: !0,
      placeholderValue: chrome.i18n.getMessage("exportGroupPlaceholder"),
    });
    $("#number").attr("placeholder", U);
    $("#number").tokenfield({ inputType: "tel", createTokensOnBlur: !0 });
    f.passedElement.element.addEventListener(
      "addItem",
      function (g) {
        $("#selectAllGroups").prop("checked", !1);
        I = !1;
        $("#export-group").attr("disabled", !1);
      },
      !1
    );
    f.passedElement.element.addEventListener(
      "removeItem",
      function (g) {
        J = f.getValue().map((h) => h.value);
        0 == J.length && $("#export-group").attr("disabled", !0);
      },
      !1
    );
    let k = [],
      x = [],
      F = [];
    $("#choices-for-export").change(function (g) {
      g = g.target.value;
      f.clearChoices();
      "Group" == g
        ? (f.setChoices(
            k.map((h) => ({ value: h.groupId, label: h.groupName })),
            "value",
            "label",
            "false"
          ),
          $(".choices__input--cloned").attr(
            "placeholder",
            chrome.i18n.getMessage("exportGroupPlaceholder")
          ))
        : "Label" == g &&
          (f.setChoices(
            F.map((h) => ({ value: h.groupId, label: h.groupName })),
            "value",
            "label",
            "false"
          ),
          $(".choices__input--cloned").attr(
            "placeholder",
            chrome.i18n.getMessage("exportLabelPlaceholder")
          ));
    });
    P = $('input[name="chatListOptions"]:checked').val();
    $("#selectAllGroups").change(function () {
      this.checked
        ? (f.removeActiveItems(),
          (I = !0),
          $("#export-group").attr("disabled", !1))
        : ((I = !1), $("#export-group").attr("disabled", !0));
    });
    $("#export-group").click(function () {
      J = f.getValue().map((g) => g.value);
      (0 < J.length || I) && b($("#choices-for-export").val(), J, I, P);
    });
    $("#export-list").click(function () {
      b("Chat", J, I, P);
    });
    $('input[name="chatListOptions"]').change(function () {
      P = $('input[name="chatListOptions"]:checked').val();
    });
    $("#download_members").click(function () {
      q && a();
    });
  }
  function wa(a) {
    let b = a.collaborators,
      c = a.planhistory[a.planhistory.length - 1].usageQuantityAllowed[0],
      d = b.length;
    b.map((e, f) => {
      if (e.phoneNumber) {
        let k = $(".teamMember").eq(0).clone();
        k.prop("id", e.phoneNumber).removeClass("hidden");
        k.find(".memberName").text(e.name);
        k.find(".memberNumber").text(e.phoneNumber);
        k.find(".removeMember").on("click", async () => {
          $(`#${e.phoneNumber}`).remove();
          const x = b.indexOf(b[f]);
          -1 < x && (b.splice(x, 1), (a.collaborators = b), l({ mainUser: a }));
          --d;
          $("#memberCount").html(chrome.i18n.getMessage("memberCount", [d, c]));
          0 == d && $("#noteamMember").show();
          W("REMOVE", e.phoneNumber, "");
          $("#addMember").removeAttr("disabled");
        });
        $("#memberTable").append(k);
      }
    });
  }
  function Q(a, b) {
    var c;
    var d = document.getElementsByClassName("tabcontent");
    for (c = 0; c < d.length; c++) d[c].style.display = "none";
    d = document.getElementsByClassName("tablinks");
    for (c = 0; c < d.length; c++)
      d[c].className = d[c].className.replace(" active", "");
    document.getElementById(b).style.display = "block";
    a.currentTarget.className += " active";
  }
  function X(a, b) {
    $("#number-tokenfield").attr("placeholder", na);
    $("#number").tokenfield("disable");
    $("#personalizedVariable").text("Select Variable");
    $("#personalizedVariable_attachment").text("Select Variable");
    for (const [f, k] of Object.entries(a.SheetNames)) {
      var c = document.getElementById("options2"),
        d = document.createElement("option");
      d.name = "..";
      d.value = f;
      d.innerText = k;
      c.appendChild(d);
      c.style.display = "";
    }
    $("#options2").val(b);
    z = XLSX.utils.sheet_to_json(a.Sheets[a.SheetNames[b]], { header: "A" });
    t = 2;
    u = z.length;
    chrome.storage.local.set({ sheets_json: a });
    chrome.storage.local.set({ contacts: z });
    chrome.storage.local.set({ from_column: t });
    chrome.storage.local.set({ to_column: u });
    $("#enter-excel-from").val(t);
    $("#enter-excel-to").val(u);
    $("#contacts-found").text(
      chrome.i18n.getMessage("contactFoundText", [u - t + 1])
    );
    $("#contacts-found").css("display", "flex");
    $("#send").attr("disabled", !1);
    for (const [f, k] of Object.entries(z[0])) {
      a = document.getElementById("options");
      c = document.getElementById("token");
      d = document.getElementById("token_attachment");
      var e = document.createElement("option");
      e.name = "..";
      e.value = f;
      e.innerText = k;
      let x = e.cloneNode(!0),
        F = e.cloneNode(!0);
      a.appendChild(e);
      c.appendChild(x);
      d.appendChild(F);
      a.style.display = "";
    }
    chrome.storage.local.set({ sheetNumber: b });
    $("#options_div").css("display", "block");
    $("#options_div1").css("display", "block");
    $("#options_div2").css("display", "block");
    $("#options_div3").css("display", "block");
    $("#deleteExecl").css("display", "block");
    $("#filter_numbers").css("display", "flex");
    $("#downloadExcelTemplate").css("display", "none");
    document.getElementById("execlSheetBtn").parentElement.style.display =
      "none";
  }
  function pa() {
    chrome.storage.local.remove(["contacts", "sheets_json"]);
    let a = document.getElementById("options").lastElementChild;
    for (; a; )
      document.getElementById("options").removeChild(a),
        (a = document.getElementById("options").lastElementChild);
    for (a = document.getElementById("options2").lastElementChild; a; )
      document.getElementById("options2").removeChild(a),
        (a = document.getElementById("options2").lastElementChild);
    z = {};
    $("#contacts-found").text(chrome.i18n.getMessage("contactFoundText", [0]));
    $("#send").attr("disabled", !0);
    a = document.getElementById("token").lastElementChild;
    let b = document.getElementById("token").firstElementChild.cloneNode(!0);
    for (; a; )
      document.getElementById("token").removeChild(a),
        (a = document.getElementById("token").lastElementChild);
    document.getElementById("token").appendChild(b);
    a = document.getElementById("token_attachment").lastElementChild;
    for (
      b = document
        .getElementById("token_attachment")
        .firstElementChild.cloneNode(!0);
      a;

    )
      document.getElementById("token_attachment").removeChild(a),
        (a = document.getElementById("token_attachment").lastElementChild);
    document.getElementById("token_attachment").appendChild(b);
    $("#options_div").css("display", "none");
    $("#options_div1").css("display", "none");
    $("#options_div2").css("display", "none");
    $("#options_div3").css("display", "none");
    $("#deleteExecl").css("display", "none");
    $("#filter_numbers").css("display", "none");
    document.getElementById("execlSheetBtn").parentElement.style.display =
      "flex";
    $("#downloadExcelTemplate").css("display", "flex");
    $("#is_custom_message").is(":checked") && $("#is_custom_message").click();
    $("#personalizedVariable").text(chrome.i18n.getMessage("uploadExcelBtn"));
    $("#personalizedVariable_attachment").text(
      chrome.i18n.getMessage("uploadExcelBtn")
    );
    $("#number-tokenfield").attr("placeholder", U);
    $("#number").tokenfield("enable");
    $("#sheet_number").attr("disabled", !1);
    $("#verifyGoogleSheet").attr("disabled", !1);
    $("#verifyGoogleSheet").addClass(
      "bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-2 px-4 rounded h-100 mr-5 inline-flex items-center"
    );
    chrome.storage.local.remove("numberColumn");
    chrome.storage.local.remove("sheetNumber");
  }
  async function Y() {
    let a = await n("attachment_data");
    a &&
      a.attachment_data &&
      ((a = a.attachment_data),
      6 < a.length
        ? ($("#add_attachment_button").attr("disabled", "disabled"),
          $("#add_attachment_button").addClass(" cursor-not-allowed"))
        : ($("#add_attachment_button").removeAttr("disabled"),
          $("#add_attachment_button").removeClass(" cursor-not-allowed")),
      $("#attachmentBody").empty(),
      a.forEach((b) => {
        let c = $("#sample-attachment-data").clone();
        c.prop("id", b.fileName);
        20 < b.fileName.length
          ? c.find(".fileName").text(b.fileName.slice(0, 17) + "...")
          : c.find(".fileName").text(b.fileName);
        20 < b.fileType.length
          ? c.find(".fileType").text(b.fileType.slice(0, 17) + "...")
          : c.find(".fileType").text(b.fileType);
        16 < b.fileCaption.length
          ? c.find(".fileCaption").text(b.fileCaption.slice(0, 13) + "...")
          : c.find(".fileCaption").text(b.fileCaption);
        c.removeClass("hidden");
        c.find(".fileEdit").click(() => {
          $("#attachmentModalTitle").text(
            chrome.i18n.getMessage("attachmentModalTitle_edit")
          );
          $("#formFileSm").hide();
          $("#file_input_help").hide();
          $("#attachment_modal_file_name").text(b.fileName);
          $("#attachment_modal_file_type").text(b.fileType);
          $("#addTimeStamp_optionCaption").prop(
            "checked",
            "undefined" === typeof b.fileAddTimeStamp ? !0 : b.fileAddTimeStamp
          );
          document.getElementById("attachment_modal_file_caption").value =
            b.fileCaption;
          R.show();
          K = b.fileName;
          "image" == b.fileType.split("/")[0] ||
          "video" == b.fileType.split("/")[0]
            ? ($("#attachment_caption_area").show(),
              $("#addTimeStampCaption").show())
            : ((document.getElementById("attachment_modal_file_caption").value =
                ""),
              $("#attachment_caption_area").hide(),
              $("#addTimeStampCaption").hide());
        });
        c.find(".fileDelete").click(async () => {
          a = a.filter((d) => d.fileName != b.fileName);
          await l({ attachment_data: a });
          Y();
        });
        $("#attachmentBody").append(c);
      }));
  }
  function xa(a) {
    return new Promise((b, c) => {
      const d = new FileReader();
      d.readAsDataURL(a);
      d.onload = () => b(d.result);
      d.onerror = (e) => c(e);
    });
  }
  async function ya(a) {
    if (!a) return !1;
    let b = !0;
    16e6 < a.size &&
      (alert(
        chrome.i18n.getMessage("fileSizeAlert", [
          a.name,
          Math.ceil(a.size / 1048576),
        ])
      ),
      $("#formFileSm").val(""),
      (b = !1));
    let c = await n("attachment_data");
    c = c.attachment_data || [];
    c.forEach((d) => {
      d.fileName == a.name &&
        ((b = !1),
        alert(chrome.i18n.getMessage("fileDuplicateAlert", a.name)),
        $("#formFileSm").val(""));
    });
    return b;
  }
  function qa(a, b, c) {
    iziToast.error({
      title: chrome.i18n.getMessage("iziToastExcelSizeError"),
      message: a,
      displayMode: 0,
      position: b,
      buttons: [
        [
          "<button>Okay</button>",
          function (d, e) {
            c();
            d.hide({ transitionOut: "fadeOut" }, e, "button");
          },
        ],
        [
          "<button>Upgrade Plan</button>",
          async function (d, e) {
            c();
            d.hide({ transitionOut: "fadeOut" }, e, "button");
            window.open("https://wamessager.com/pricing", "_blank");
          },
          !0,
        ],
      ],
      onClosing: function (d, e, f) {},
      onClosed: function (d, e, f) {},
    });
  }
  function D() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      0 !== a.length &&
        a.forEach(function (b) {
          chrome.scripting.executeScript({
            target: { tabId: b.id },
            files: ["js/load.js"],
          });
        });
    });
  }
  async function W(a, b, c) {
    var d = new Headers();
    d.append("Content-Type", "application/json");
    let e = await n("phoneNumber");
    a = JSON.stringify({
      mainPhoneNumber: e.phoneNumber,
      collaboratorName: c,
      collaboratorPhoneNumber: b,
      type: a,
    });
    fetch("https://wamessager-backend.onrender.com/api/user/addCollaborator", {
      method: "POST",
      headers: d,
      body: a,
      redirect: "follow",
    }).then((f) => {
      if (200 == f.status) return !0;
    });
  }
  async function ua() {
    let a = await chrome.storage.local.get("onBoarding");
    void 0 != a && a.onBoarding
      ? (oa(), $("#defaultOpen").click())
      : (void 0 == O && (O = "919356745862"),
        $("#onboardingNumber").val(O),
        $("#loadingScreen").hide(),
        $("#onboarding").show(),
        $("body").chardinJs("start"));
  }
  var ka,
    ma,
    la,
    J = [],
    I = !0,
    P,
    U,
    na;
  let B;
  document.getElementById("first");
  document.getElementById("second");
  document.getElementById("premium_box");
  document.getElementById("free_messsag_count");
  document.getElementById("top_free_message_count");
  let q = !1;
  var N, O, p;
  let v = 1,
    w = 1,
    t = 1,
    u = 1;
  var Z,
    z = {},
    za = document.getElementById("send"),
    S = [],
    G = !1,
    L = !1,
    T = !1,
    M = {},
    ra,
    m = {
      state: "STOP",
      operation: "",
      msgCount: "",
      msgSent: "",
      msgTotal: "",
    },
    y = 50,
    E,
    H = Date.now();
  await chrome.tabs.query(
    { url: "https://web.whatsapp.com/*", currentWindow: !0 },
    function (a) {
      0 < a.length
        ? ((ra = a[0].id),
          chrome.tabs.update(ra, { active: !0, highlighted: !0 }))
        : chrome.tabs.create({ url: "https://web.whatsapp.com/" });
      sa();
    }
  );
  $("textarea#message").on("change", function () {
    let a = document.querySelector("textarea#message").value;
    $("#template-dropdown").selectpicker("val", "default");
    $("#deleteTemplate").css("display", "none");
    chrome.storage.local.set({ text: a }, function () {});
  });
  $("#defaultOpen").click(function (a) {
    Q(a, "SendMessages");
  });
  $("#Premium").click(function (a) {
    Q(a, "GetPremium");
  });
  $("#buypremium,#premium2,#top_premium,#buypremium1").click(function () {
    window.open("https://wamessager.com/pricing");
  });
  $("#Collaborators").click(function (a) {
    Q(a, "collaboratorsTab");
  });
  $("#Enhancement").click(function (a) {
    Q(a, "EnhancementTab");
  });
  $("#execlSheetBtn").on("change", function (a) {
    if (q && (Z = a.target.files[0]))
      if (5 < Math.round(Z.size / 1048576))
        iziToast.error({
          title: chrome.i18n.getMessage("iziToastExcelSizeError"),
          message: chrome.i18n.getMessage("iziToastExcelSizeErrorMsg"),
          displayMode: 0,
          position: "topRight",
        });
      else {
        var b = new FileReader();
        b.onload = function (c) {
          c = new Uint8Array(c.target.result);
          M = XLSX.read(c, { type: "array", raw: !0 });
          X(M, 0);
          for (const [d, e] of Object.entries(z[1]))
            if (4 < e.toString().replace(/\D/g, "").replace(/^0+/, "").length) {
              $("#options").val(d);
              break;
            }
          chrome.storage.local.set({ numberColumn: $("#options").val() });
        };
        b.readAsArrayBuffer(Z);
        a.target.value = "";
      }
  });
  $("#options").change(() => {
    chrome.storage.local.set({ numberColumn: $("#options").val() });
  });
  $("#enter-excel-from").change((a) => {
    2 > a.target.value && (a.target.value = 2);
    a.target.value = parseInt(a.target.value);
    u = parseInt(u);
    a.target.value > u && (a.target.value = u);
    t = parseInt(a.target.value);
    chrome.storage.local.set({ from_column: t });
    $("#contacts-found").text(
      chrome.i18n.getMessage("contactFoundText", [u - t + 1])
    );
  });
  $("#enter-excel-to").change((a) => {
    a.target.value > z.length && (a.target.value = z.length);
    a.target.value = parseInt(a.target.value);
    t = parseInt(t);
    a.target.value < t && (a.target.value = t);
    u = parseInt(a.target.value);
    chrome.storage.local.set({ to_column: u });
    $("#contacts-found").text(
      chrome.i18n.getMessage("contactFoundText", [u - t + 1])
    );
  });
  $("#options2").change(() => {
    let a = $("#options2").val();
    pa();
    X(M, a);
  });
  $("#deleteExecl").click(pa);
  $("#downloadExcelTemplate").on("click", () => {
    B = { downloadExcelTemplate: !0 };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: B }, function () {});
    });
  });
  $("#filter_numbers").on("click", function () {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      var b = a[0],
        c = [],
        d = $("#options").find(":selected").val();
      m = { ...m, state: "SEND", operation: "FILTER" };
      chrome.storage.local.set({ currentState: m }, () => {
        $("#send").css("display", "none");
        $("#stop").css("display", "");
        $("#pause").css("display", "");
        $("#continue").css("display", "none");
        $("#export_results").css("display", "none");
        $("#filter_numbers").attr("disabled", "disabled");
        for (var e = 1; e < z.length; e++) {
          var f = z[e][d];
          void 0 == f || null == f ? c.push("") : c.push(f);
        }
        chrome.tabs.sendMessage(b.id, {
          context: { filter_numbers: "true" },
          arr: c,
        });
      });
    });
  });
  $("#number").on("change", function () {
    let a = document.querySelector("input#number").value;
    if (0 < a.length) {
      $("#sheet_number").attr("disabled", !0);
      q &&
        ($("#input").attr("disabled", !0),
        $("#input")
          .parent()
          .closest("label")
          .removeClass("bg-green-700 hover:bg-green-900"),
        $("#input").parent().closest("label").addClass("bg-gray-700"),
        $("#input")
          .parent()
          .closest("label")
          .attr("title", "Delete numbers from below to upload excel sheet"));
      $("#downloadExcelTemplate").attr("disabled", !0);
      $("#deleteExcelTemplate").attr("disabled", !0);
      let b = a.replace(/[^\d,]/g, "");
      b = b.split(",");
      b = b.filter((c) => c);
      $("#contacts-found").text(
        chrome.i18n.getMessage("contactFoundText", [b.length])
      );
      $("#contacts-found").css("display", "flex");
      $("#send").attr("disabled", !1);
    } else $("#sheet_number").attr("disabled", !1), q && ($("#input").attr("disabled", !1), $("#input").parent().closest("label").attr("title", ""), $("#input").parent().closest("label").addClass("bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-2 px-4 rounded h-100 mr-5 inline-flex items-center")), $("#downloadExcelTemplate").removeAttr("disabled"), $("#contacts-found").text(chrome.i18n.getMessage("contactFoundText", [0])), $("#send").attr("disabled", !0);
    chrome.storage.local.set({ numbersList: a }, function () {});
  });
  $("#clear").click(function () {
    "" != document.querySelector("input#number").value &&
      ((document.querySelector("input#number").value = ""),
      $("input#number").tokenfield("setTokens", []),
      $("#sheet_number").attr("disabled", !1),
      q &&
        ($("#input").attr("disabled", !1),
        $("#input").parent().closest("label").attr("title", ""),
        $("#input")
          .parent()
          .closest("label")
          .addClass(
            "bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-2 px-4 rounded h-100 mr-5 inline-flex items-center"
          )),
      $("#downloadExcelTemplate").removeAttr("disabled"),
      $("#contacts-found").text(
        chrome.i18n.getMessage("contactFoundText", [0])
      ),
      $("#send").attr("disabled", !0),
      chrome.storage.local.set({ numbersList: "" }, function () {}));
  });
  $("#send_attachments").change(function () {
    (G = $("#send_attachments").is(":checked"))
      ? ((document.getElementById("steps_for_attachments").style.display =
          "flex"),
        $("#add_attachment_button").removeClass("hidden"))
      : ((document.getElementById("steps_for_attachments").style.display =
          "none"),
        $("#add_attachment_button").addClass("hidden"));
  });
  let R = new Modal(document.getElementById("small-modal")),
    K;
  $("#add_attachment_button").click(function (a) {
    $("#attachmentModalTitle").text(
      chrome.i18n.getMessage("attachmentModalTitle_add")
    );
    R.show();
    $("#formFileSm").show();
    $("#file_input_help").show();
  });
  $("#attachment_close_button").click(() => {
    K = null;
    $("#attachment_caption_area").hide();
    $("#addTimeStampCaption").hide();
    $("#formFileSm").val("");
    $("#attachment_modal_file_name").text("");
    $("#attachment_modal_file_type").text("");
    document.getElementById("attachment_modal_file_caption").value = "";
    R.hide();
  });
  $("#formFileSm").change(async function () {
    const a = $(this).get(0).files[0];
    (await ya(a))
      ? ($("#attachment_modal_file_name").text(a.name),
        $("#attachment_modal_file_type").text(a.type),
        "image" == a.type.split("/")[0] || "video" == a.type.split("/")[0]
          ? ($("#attachment_caption_area").show(),
            $("#addTimeStampCaption").show())
          : ((document.getElementById("attachment_modal_file_caption").value =
              ""),
            $("#attachment_caption_area").hide(),
            $("#addTimeStampCaption").hide()))
      : ($("#attachment_modal_file_name").text(""),
        $("#attachment_modal_file_type").text(""));
  });
  $("#attachment_modal_submit").click(async () => {
    let a = await n("attachment_data");
    a = a.attachment_data || [];
    if (K)
      for (var b = 0; b < a.length; b++) {
        if (a[b].fileName === K) {
          a[b].fileCaption = document.getElementById(
            "attachment_modal_file_caption"
          ).value;
          a[b].fileAddTimeStamp = $("#addTimeStamp_optionCaption").is(
            ":checked"
          );
          await l({ attachment_data: a });
          break;
        }
      }
    else {
      let c = document.getElementById("formFileSm").files[0];
      if (!c) {
        alert(chrome.i18n.getMessage("fileEmptyAlert"));
        return;
      }
      b = await new Promise((d) => {
        xa(c).then((e) => {
          let f = {};
          f.fileName = c.name;
          f.fileType = c.type;
          f.fileData = JSON.stringify(e);
          f.fileCaption = document.getElementById(
            "attachment_modal_file_caption"
          ).value;
          "image" == f.fileType.split("/")[0] ||
          "video" == f.fileType.split("/")[0]
            ? (f.fileAddTimeStamp = $("#addTimeStamp_optionCaption").is(
                ":checked"
              ))
            : (f.fileAddTimeStamp = !1);
          d(f);
        });
      });
      a.push(b);
      await l({ attachment_data: a });
    }
    K = null;
    $("#attachment_caption_area").hide();
    $("#addTimeStampCaption").hide();
    $("#formFileSm").val("");
    $("#attachment_modal_file_name").text("");
    $("#attachment_modal_file_type").text("");
    document.getElementById("attachment_modal_file_caption").value = "";
    Y();
    R.hide();
  });
  $("#unsubscribe_option").click(function () {
    $("#unsubscribe_option").is(":checked") &&
      (document.querySelector("#message").value +=
        "\nYou can unsubscribe to future messages by replying UNSUBSCRIBE here.");
  });
  $("#unsubscribe_option").change(function () {
    L = !!$(this).is(":checked");
  });
  $("#is_custom_message").change(function () {
    $(this).is(":checked")
      ? ((T = !0), (document.getElementById("token").style.display = ""))
      : ((T = !1), (document.getElementById("token").style.display = "none"));
  });
  $("#token").change(function () {
    if (void 0 === $("#token").find(":selected").attr("disabled")) {
      var a = $("#message").prop("selectionStart"),
        b = $("#message").val(),
        c = b.substring(0, a);
      a = b.substring(a, b.length);
      $("#message").val(
        c + "{{" + $("#token").find(":selected").text() + "}}" + a
      );
    }
    c = document.querySelector("textarea#message").value;
    chrome.storage.local.set({ text: c }, function () {});
  });
  $("#token_attachment").change(function () {
    if (void 0 === $("#token_attachment").find(":selected").attr("disabled")) {
      var a = $("#attachment_modal_file_caption").prop("selectionStart"),
        b = $("#attachment_modal_file_caption").val(),
        c = b.substring(0, a);
      a = b.substring(a, b.length);
      $("#attachment_modal_file_caption").val(
        c + "{{" + $("#token_attachment").find(":selected").text() + "}}" + a
      );
    }
  });
  $("#addTemplate").click(function () {
    "" !== document.querySelector("#message").value &&
      chrome.storage.local.get(["templatesObj"], function (a) {
        ((a = a.templatesObj) && a instanceof Array) || (a = []);
        a.push(document.querySelector("#message").value);
        let b = document.createElement("option");
        b.innerText = document.querySelector("#message").value.trim();
        b.classList.add("template-text");
        b.value = document.querySelector("#message").value;
        document.querySelector("#template-dropdown").appendChild(b);
        $("#template-dropdown").selectpicker("refresh");
        chrome.storage.local.set({ templatesObj: a }, function () {});
        iziToast.success({
          title: chrome.i18n.getMessage("templateModifyTitle"),
          message: chrome.i18n.getMessage("templateAddedMessage"),
          displayMode: 0,
          position: "topRight",
        });
      });
  });
  $("#template-dropdown").on("change", function () {
    $("#template-dropdown").find(":selected").attr("disabled") ||
      ((document.querySelector("textarea#message").value = $(
        "#template-dropdown"
      )
        .find(":selected")
        .val()),
      $("#deleteTemplate").css("display", ""));
    chrome.storage.local.set({
      text: document.querySelector("textarea#message").value,
    });
  });
  $("#supportFooter, #SupportTutorial").on("click", () => {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, {
        context: { contactSupport: !0, supportNumber: N },
      });
    });
  });
  $("#deleteTemplate").on("click", () => {
    let a = $("#template-dropdown").find(":selected");
    a.attr("disabled") ||
      (a.remove(),
      $("#template-dropdown").selectpicker("refresh"),
      $("#template-dropdown").selectpicker("val", "default"),
      $("#deleteTemplate").css("display", "none"),
      chrome.storage.local.get(["templatesObj"], function (b) {
        if ((b = b.templatesObj)) {
          var c = b.indexOf(a.val());
          -1 !== c &&
            (b.splice(c, 1),
            chrome.storage.local.set({ templatesObj: b }, function () {}),
            iziToast.success({
              title: chrome.i18n.getMessage("templateModifyTitle"),
              message: chrome.i18n.getMessage("templateRemoveMessage"),
              displayMode: 0,
              position: "topRight",
            }));
        }
      }));
  });
  za.addEventListener("click", async function () {
    let a = !0,
      b = !1;
    void 0 == (await n("ALLOWED_UPPER_LIMIT")).ALLOWED_UPPER_LIMIT
      ? await l({ ALLOWED_UPPER_LIMIT: !1 })
      : await n("ALLOWED_UPPER_LIMIT");
    void 0 == (await n("ALLOWED_LOWER_LIMIT")).ALLOWED_LOWER_LIMIT
      ? await l({ ALLOWED_LOWER_LIMIT: !1 })
      : (b = (await n("ALLOWED_LOWER_LIMIT")).ALLOWED_LOWER_LIMIT);
    let c = (await n("mainUser")).mainUser.messagesSent,
      d = await n("attachment_data"),
      e;
    d.attachment_data
      ? (d = d.attachment_data)
      : ((d = []), l({ attachment_data: d }));
    if (
      "" === document.getElementById("message").value.trim() &&
      (1 > d.length || !G)
    )
      iziToast.error({
        title: "Error",
        message: "Text Message can not be empty or add Some Attachment",
        displayMode: 0,
        position: "topRight",
      });
    else {
      let F = document.getElementById("message").value,
        g = document.getElementById("addTimeStamp_option").checked;
      if (z.length) {
        if (!q) return;
        var f = $("#options").find(":selected").val();
        S = [];
        let h = [z[0], ...z.slice(t - 1, u)];
        for (var k = 1; k < h.length; k++) {
          var x = h[k][f];
          null == x || void 0 == x ? S.push("") : S.push(x);
        }
        e = {
          command: "start messaging background",
          is_image: G && 0 < d.length,
          arr: S,
          message: F,
          premium: q,
          timeDelayFrom: v,
          timeDelayTo: w,
          is_time_stamp: g,
          fs: L,
          batched: !1,
          is_custom_message: T,
          execl_coloumn: h,
        };
      } else
        (f = $("#number").val().split(",")),
          (e = {
            command: "start messaging background",
            is_image: G && 0 < d.length,
            arr: f,
            timeDelayFrom: v,
            timeDelayTo: w,
            is_time_stamp: g,
            batched: !1,
            message: F,
            premium: q,
            is_unsubscribe: L,
          });
      !q && e.arr.length > y
        ? ((a = !1),
          await new Promise(async (h) => {
            0 < y
              ? qa(
                  chrome.i18n.getMessage("iziToastErrMsgLeftMsg", [y]),
                  "center",
                  h
                )
              : qa(
                  chrome.i18n.getMessage("iziToastErrMsgFinishedMsg", [E]),
                  "center",
                  h
                );
          }))
        : (50 <= c) & (100 >= c) & !b &&
          (await new Promise(async (h) => {
            iziToast.question({
              timeout: 2e4,
              close: !1,
              overlay: !0,
              displayMode: "once",
              id: "question",
              zindex: 999,
              title: chrome.i18n.getMessage("iziToastMsgLimitWarning"),
              message: chrome.i18n.getMessage("iziToastMsgLimitWarningMsg", [
                "50",
              ]),
              position: "center",
              buttons: [
                [
                  "<button><is_attachment>Yes, Send Now</is_attachment></button>",
                  function (r, A) {
                    h();
                    a = !0;
                    r.hide({ transitionOut: "fadeOut" }, A, "button");
                    l({ ALLOWED_LOWER_LIMIT: !0 });
                  },
                  !0,
                ],
                [
                  "<button>No, Don't Send</button>",
                  function (r, A) {
                    h();
                    a = !1;
                    r.hide({ transitionOut: "fadeOut" }, A, "button");
                  },
                ],
              ],
              onClosing: function (r, A, V) {},
              onClosed: function (r, A, V) {},
            });
          }));
      a &&
        ((m = { ...m, state: "SEND", operation: "MESSAGE" }),
        chrome.storage.local.set({ currentState: m }, () => {
          $("#send").css("display", "none");
          $("#stop").css("display", "");
          $("#pause").css("display", "");
          $("#continue").css("display", "none");
          $("#export_results").css("display", "none");
          $("#filter_numbers").attr("disabled", "disabled");
          chrome.runtime.sendMessage({ context: e });
        }));
    }
  });
  $("#stop").on("click", function () {
    $("#send").css("display", "");
    $("#continue").css("display", "none");
    $("#stop").css("display", "none");
    $("#pause").css("display", "none");
    $("#export_results").css("display", "");
    B = { process_state: "STOP" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: B }, function () {});
    });
  });
  $("#export_results").click(function () {
    B = { export_results: "true" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: B }, function () {});
    });
  });
  chrome.runtime.onMessage.addListener(async (a) => {
    if ("content" === a.from)
      if (a.count < a.total)
        "progress-bar-filter" == a.subject
          ? ((document.getElementById("sorted-number-filter").innerHTML =
              a.count + 1 + "/" + a.total),
            (a = (115 * (a.count + 1)) / a.total),
            (document.getElementById("progress-indicator-filter").style.width =
              a.toString() + "px"),
            (document.getElementById(
              "progress-container-filter"
            ).style.display = "block"))
          : "progress-bar-sent" == a.subject &&
            (q
              ? (document.getElementById("messageCount").innerHTML = `<strong>${
                  p.messagesSent + a.sent
                }</strong>`)
              : (document.getElementById("messageCount").innerHTML = `<strong>${
                  y - a.sent
                }</strong>`),
            (document.getElementById("sorted-number-sent").innerHTML =
              a.count + 1 + "/" + a.total),
            (a = (115 * (a.count + 1)) / a.total),
            (document.getElementById("progress-indicator-sent").style.width =
              a.toString() + "px"),
            (document.getElementById("progress-container-sent").style.display =
              "block"));
      else {
        $("#send").css("display", "");
        $("#continue").css("display", "none");
        $("#stop").css("display", "none");
        $("#pause").css("display", "none");
        $("#export_results").css("display", "");
        $("#filter_numbers").removeAttr("disabled");
        document.getElementById("progress-container-filter").style.display =
          "none";
        document.getElementById("progress-container-sent").style.display =
          "none";
        "progress-bar-sent" == a.subject &&
          (q
            ? (document.getElementById("messageCount").innerHTML = `<strong>${
                p.messagesSent + a.sent
              }</strong>`)
            : (document.getElementById("messageCount").innerHTML = `<strong>${
                y - a.sent
              }</strong>`),
          (p.messagesSent += a.sent),
          (y -= a.sent));
        let b = (await n("reviewAskLastDate")).reviewAskLastDate,
          c = (await n("reviewUs")).reviewUs;
        void 0 == c ||
          c ||
          (void 0 != b
            ? ((b = new Date(b)),
              1 < (new Date() - b) / 864e5 && $("#reviewFooter").click())
            : 10 < p.messagesSent + a.sent && $("#reviewFooter").click());
      }
  });
  $("#timer-checkbox").change(function () {
    let a = document.querySelector("#timer-checkbox").checked;
    a
      ? ($("#timer-gap-inputs").css("display", "block"),
        (v = parseInt($("#time-delay").val())),
        (w = parseInt($("#time-delay-to").val())),
        l({ timeDelayFrom: v, timeDelayTo: w }))
      : ($("#timer-gap-inputs").css("display", "none"), (w = v = 1));
    l({ timer_gap: a });
  });
  $("#time-delay").on("blur", function (a) {
    1 > a.target.value && (a.target.value = 1);
    a.target.value = parseInt(a.target.value);
    w = parseInt(w);
    a.target.value > w && (a.target.value = w);
    v = parseInt(a.target.value || 10);
    l({ timeDelayFrom: v });
  });
  $("#time-delay-to").on("blur", function (a) {
    300 < a.target.value && (a.target.value = 300);
    a.target.value = parseInt(a.target.value);
    v = parseInt(v);
    a.target.value < v && (a.target.value = v);
    w = parseInt(a.target.value || 10);
    l({ timeDelayTo: w });
  });
  $("#pause").on("click", () => {
    B = { process_state: "PAUSE" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: B }, function () {});
    });
    $("#send").css("display", "none");
    $("#continue").css("display", "");
    $("#stop").css("display", "");
    $("#pause").css("display", "none");
    $("#export_results").css("display", "none");
  });
  $("#continue").on("click", () => {
    B = { process_state: "CONTINUE" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: B }, function () {});
    });
    $("#send").css("display", "none");
    $("#continue").css("display", "none");
    $("#stop").css("display", "");
    $("#pause").css("display", "");
    $("#export_results").css("display", "none");
  });
  $(
    "#form-checks input, #unsub_div input, #addTimeStamp input,#custom_div input ,#batching-timer-checkbox, #batching-numbers,#batching-time-delay, #send_attachments, #uncheck_attachment"
  ).change(function () {
    let a = document.querySelector("#send_attachments").checked,
      b = document.querySelector("#unsubscribe_option").checked,
      c = document.querySelector("#addTimeStamp_option").checked,
      d = document.querySelector("#is_custom_message").checked,
      e = document.querySelector("textarea#message").value;
    chrome.storage.local.set({
      attachment: a,
      unsubscribe: b,
      addTimeStamp: c,
      customMessage: d,
      text: e,
    });
  });
  let C = document.getElementById("blurToggleAll"),
    aa = document.getElementById("blurAllMessageToggle"),
    ba = document.getElementById("blurLastMesssageToggle"),
    ca = document.getElementById("blurMediaPreviewToggle"),
    da = document.getElementById("blurMediaGallaryToggle"),
    ea = document.getElementById("blurTextInputToggle"),
    fa = document.getElementById("blurProfilePictureToggle"),
    ha = document.getElementById("blurGroupUserNameToggle"),
    ia = document.getElementById("noTransitionDelayToggle"),
    ja = document.getElementById("unblurAllToggle");
  C.addEventListener("change", function () {
    chrome.storage.local.set({
      blurToggleAll: this.checked,
      blurAllMessageToggle: this.checked,
      blurLastMesssageToggle: this.checked,
      blurMediaPreviewToggle: this.checked,
      blurMediaGallaryToggle: this.checked,
      blurTextInputToggle: this.checked,
      blurProfilePictureToggle: this.checked,
      blurGroupUserNameToggle: this.checked,
      noTransitionDelayToggle: this.checked,
      unblurAllToggle: this.checked,
    });
    aa.checked =
      ba.checked =
      ca.checked =
      da.checked =
      ea.checked =
      fa.checked =
      ha.checked =
      ia.checked =
      ja.checked =
        this.checked;
    D();
  });
  aa.addEventListener("change", function () {
    chrome.storage.local.set({ blurAllMessageToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  ba.addEventListener("change", function () {
    chrome.storage.local.set({ blurLastMesssageToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  ca.addEventListener("change", function () {
    chrome.storage.local.set({ blurMediaPreviewToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  da.addEventListener("change", function () {
    chrome.storage.local.set({ blurMediaGallaryToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  ea.addEventListener("change", function () {
    chrome.storage.local.set({ blurTextInputToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  fa.addEventListener("change", function () {
    chrome.storage.local.set({ blurProfilePictureToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  ha.addEventListener("change", function () {
    chrome.storage.local.set({ blurGroupUserNameToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  ia.addEventListener("change", function () {
    chrome.storage.local.set({ noTransitionDelayToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  ja.addEventListener("change", function () {
    chrome.storage.local.set({ unblurAllToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (C.checked = this.checked));
    D();
  });
  document.getElementById("enableLikeToggle");
  document.getElementById("enableMessageReactionToggle");
  document.getElementById("chatWithNumberToggle");
  document.getElementById("showChatFolderToggle");
  document.getElementById("showQuickReplyToggle");
  window.onload = function () {
    chrome.storage.local.get(
      "numbersList text send_status attachment attachment_data image doc contact unsubscribe addTimeStamp customMessage templatesObj to_column from_column contacts sheets_json batching batch_size batch_delay timer_gap timeDelayFrom timeDelayTo sheet_number currentState blurToggleAll blurAllMessageToggle blurLastMesssageToggle blurMediaPreviewToggle blurMediaGallaryToggle blurTextInputToggle blurProfilePictureToggle blurGroupUserNameToggle noTransitionDelayToggle unblurAllToggle".split(
        " "
      ),
      async function (a) {
        if (a.currentState) {
          m = a.currentState;
          let d, e, f;
          var b = $("#send");
          var c = $("#pause");
          d = $("#continue");
          e = $("#stop");
          f = $("#export_results");
          switch (m.state) {
            case "PAUSE":
              d.css("display", "");
              e.css("display", "");
              c.css("display", "none");
              b.css("display", "none");
              f.css("display", "none");
              break;
            case "SEND":
              d.css("display", "none"),
                e.css("display", ""),
                c.css("display", ""),
                b.css("display", "none"),
                f.css("display", "none");
          }
          if ("PAUSE" === m.state || "SEND" === m.state)
            $("#filter_numbers").attr("disabled", "disabled"),
              "FILTER" === m.operation
                ? ((document.getElementById("sorted-number-filter").innerHTML =
                    m.msgCount + 1 + "/" + m.msgTotal),
                  (b = (115 * (m.msgCount + 1)) / m.msgTotal),
                  (document.getElementById(
                    "progress-indicator-filter"
                  ).style.width = b.toString() + "px"),
                  (document.getElementById(
                    "progress-container-filter"
                  ).style.display = "block"))
                : "MESSAGE" === m.operation &&
                  (q
                    ? (document.getElementById(
                        "messageCount"
                      ).innerHTML = `<strong>${
                        p.messagesSent + m.msgSent
                      }</strong>`)
                    : (document.getElementById(
                        "messageCount"
                      ).innerHTML = `<strong>${y - m.msgSent}</strong>`),
                  (document.getElementById("sorted-number-sent").innerHTML =
                    m.msgCount + 1 + "/" + m.msgTotal),
                  (b = (115 * (m.msgCount + 1)) / m.msgTotal),
                  (document.getElementById(
                    "progress-indicator-sent"
                  ).style.width = b.toString() + "px"),
                  (document.getElementById(
                    "progress-container-sent"
                  ).style.display = "block"));
        }
        document.getElementById("number").value = a.numbersList || "";
        a.numbersList &&
          ($("#sheet_number").attr("disabled", !0),
          $("#input").attr("disabled", !0),
          $("#input")
            .parent()
            .closest("label")
            .removeClass("bg-green-700 hover:bg-green-900"),
          $("#input").parent().closest("label").addClass("bg-gray-700"),
          $("#input")
            .parent()
            .closest("label")
            .attr("title", chrome.i18n.getMessage("uploadExcelDisabledLabel")),
          $("#downloadExcelTemplate").attr("disabled", !0),
          $("#verifyGoogleSheet").attr("disabled", !0),
          $("#verifyGoogleSheet").css("background-color", "grey"),
          (b = a.numbersList.replace(/[^\d,]/g, "")),
          (b = b.split(",")),
          (b = b.filter((d) => d)),
          $("#contacts-found").text(
            chrome.i18n.getMessage("contactFoundText", [b.length])
          ),
          $("#contacts-found").css("display", "flex"),
          $("#send").attr("disabled", !1));
        $("#personalizedVariable").text(
          chrome.i18n.getMessage("uploadExcelBtn")
        );
        $("#personalizedVariable_attachment").text(
          chrome.i18n.getMessage("uploadExcelBtn")
        );
        document.querySelector("textarea#message").value = a.text || "";
        a.attachment &&
          (document
            .querySelector("#send_attachments")
            .setAttribute("checked", ""),
          $("#send_attachments_label").addClass("switch-button-checked"));
        a.unsubscribe &&
          document
            .querySelector("#unsubscribe_option")
            .setAttribute("checked", a.unsubscribe);
        a.addTimeStamp
          ? document
              .querySelector("#addTimeStamp_option")
              .setAttribute("checked", a.addTimeStamp)
          : (void 0 == a.addTimeStamp || null == a.addTimeStamp) &&
            document
              .querySelector("#addTimeStamp_option")
              .setAttribute("checked", !0);
        a.customMessage &&
          document
            .querySelector("#is_custom_message")
            .setAttribute("checked", a.customMessage);
        a.attachment &&
          ((G = !0),
          (document.querySelector("#steps_for_attachments").style.display =
            "flex"),
          $("#add_attachment_button").removeClass("hidden"));
        a.attachment_data && Y();
        a.timer_gap &&
          (document
            .querySelector("#timer-checkbox")
            .setAttribute("checked", a.timer_gap),
          (document.querySelector("#timer-gap-inputs").style.display =
            "block"));
        a.timeDelayFrom && a.timeDelayTo
          ? (document.querySelector("#time-delay").removeAttribute("disabled"),
            document
              .querySelector("#time-delay")
              .setAttribute("value", a.timeDelayFrom),
            (v = a.timeDelayFrom),
            document
              .querySelector("#time-delay-to")
              .setAttribute("value", a.timeDelayTo),
            (w = a.timeDelayTo))
          : (w = v = 1);
        document.querySelector("#time-delay").removeAttribute("title");
        if (
          !a.templatesObj ||
          (a.templatesObj[0] && a.templatesObj[0] instanceof Array)
        )
          (a.templatesObj = []), chrome.storage.local.set({ templatesObj: [] });
        a.templatesObj.forEach((d) => {
          let e = document.createElement("option");
          e.innerText = d.trim();
          e.classList.add("template-text");
          e.value = d;
          document.querySelector("#template-dropdown").appendChild(e);
          $("#template-dropdown").selectpicker("refresh");
        });
        a.customMessage &&
          ((T = !0),
          (document.getElementById("token").style.display = "inline-block"));
        a.sheets_json
          ? ($("#number").tokenfield({
              inputType: "tel",
              createTokensOnBlur: !0,
            }),
            $("#number-tokenfield").attr(
              "placeholder",
              chrome.i18n.getMessage("numberPlaceholderDisabled")
            ),
            $("#number").tokenfield("disable"),
            $("#sheet_number").attr("disabled", !0),
            $("#verifyGoogleSheet").attr("disabled", !0),
            $("#verifyGoogleSheet").removeClass("bg-green-700"),
            $("#verifyGoogleSheet").addClass("bg-gray-700"),
            $("#personalizedVariable").text("Select Variable"),
            $("#personalizedVariable_attachment").text("Select Variable"),
            $("#contacts-found").css("display", "flex"),
            $("#send").attr("disabled", !1),
            (M = a.sheets_json),
            (b = (await chrome.storage.local.get("sheetNumber")).sheetNumber) ||
              (b = 0),
            X(M, b),
            (b = (await chrome.storage.local.get("numberColumn"))
              .numberColumn) && $("#options").val(b),
            (b = (await chrome.storage.local.get("from_column")).from_column),
            (c = (await chrome.storage.local.get("to_column")).to_column),
            b && ((t = b), $("#enter-excel-from").val(t)),
            c && ((u = c), $("#enter-excel-to").val(u)),
            $("#contacts-found").text(
              chrome.i18n.getMessage("contactFoundText", [u - t + 1])
            ))
          : "" == document.getElementById("number").value &&
            $("#contacts-found").text(
              chrome.i18n.getMessage("contactFoundText", [0])
            );
        (a.contacts && 0 != a.contacts.length) ||
          a.numbersList ||
          $("#send").attr("disabled", !0);
        C.checked = a.blurToggleAll;
        aa.checked = a.blurAllMessageToggle;
        ba.checked = a.blurLastMesssageToggle;
        ca.checked = a.blurMediaPreviewToggle;
        da.checked = a.blurMediaGallaryToggle;
        ea.checked = a.blurTextInputToggle;
        fa.checked = a.blurProfilePictureToggle;
        ha.checked = a.blurGroupUserNameToggle;
        ia.checked = a.noTransitionDelayToggle;
        ja.checked = a.unblurAllToggle;
      }
    );
  };
  $("#addMember").on("click", (a) => {
    $("#addingMember").is(":visible")
      ? $("#addingMember").hide()
      : $("#addingMember").show();
  });
  $("#addNewMember").on("click", async (a) => {
    a = (await n("mainUser")).mainUser;
    var b = a.planhistory;
    let c = b[b.length - 1].usageQuantityAllowed[0],
      d = a.collaborators;
    if (d.length >= c)
      iziToast.error({
        title: chrome.i18n.getMessage("iziToastExcelSizeError"),
        message: chrome.i18n.getMessage("iziToastErrMsgQuotaExceedMsg"),
        displayMode: 0,
        position: "topRight",
      });
    else if (
      d.some(function (k) {
        return k.phoneNumber === $("#memberPhone").val();
      })
    )
      iziToast.warning({
        title: chrome.i18n.getMessage("iziToastMemberAlreadyPresentWarning"),
        message: chrome.i18n.getMessage(
          "iziToastMemberAlreadyPresentWarningMsg"
        ),
        displayMode: 0,
        position: "topRight",
      });
    else if ($("#memberName").val() && $("#memberPhone").val()) {
      await W("ADD", $("#memberPhone").val(), $("#memberName").val());
      b = $(".teamMember").eq(0).clone();
      b.prop("id", $("#memberPhone").val()).removeClass("hidden");
      b.find(".memberName").text($("#memberName").val());
      var e = b.find(".memberNumber");
      e.text($("#memberPhone").val());
      b.find(".removeMember").on("click", async () => {
        $(`#${e.text()}`).remove();
        d = p.collaborators;
        var k = d.map((x) => x.phoneNumber).indexOf(e.text());
        -1 < k && (d.splice(k, 1), (p.collaborators = d), l({ mainUser: p }));
        k = d.length;
        $("#memberCount").html(chrome.i18n.getMessage("memberCount", [k, c]));
        W("REMOVE", e.text(), "");
        0 == k && $("#noteamMember").show();
        $("#addMember").removeAttr("disabled");
      });
      var f = {};
      f.name = $("#memberName").val();
      f.phoneNumber = $("#memberPhone").val();
      d.push(f);
      p.collaborators = d;
      l({ mainUser: a, user: p });
      $("#memberCount").html(
        chrome.i18n.getMessage("memberCount", [d.length, c])
      );
      d.length == c && $("#addMember").attr("disabled", "true");
      $("#memberTable").append(b);
      iziToast.success({
        title: chrome.i18n.getMessage("iziToastMemberAddedSuccess"),
        message: chrome.i18n.getMessage("iziToastMemberAddedSuccessMsg"),
        displayMode: 0,
        position: "topRight",
      });
      $("#addingMember").hide();
      $("#memberName").val("");
      $("#memberPhone").val("");
      $("#noteamMember").hide();
    } else
      iziToast.warning({
        title: chrome.i18n.getMessage("iziToastAddNamePhoneWarning"),
        message: chrome.i18n.getMessage("iziToastAddNamePhoneWarningMsg"),
        displayMode: 0,
        position: "topRight",
      });
  });
  const va = () => {
      iziToast.info({
        timeout: 2e4,
        close: !1,
        overlay: !0,
        animateInside: !0,
        iconUrl: "./assets/star.svg",
        displayMode: "once",
        id: "question",
        zindex: 999,
        title: chrome.i18n.getMessage("iziToastUpgradeInfo"),
        message: chrome.i18n.getMessage("iziToastUpgradeInfoMsg", [E, N]),
        position: "center",
        buttons: [
          [
            "<button>Not now</button>",
            function (a, b) {
              a.hide({ transitionOut: "fadeOut" }, b, "button");
            },
          ],
          [
            "<button>Upgrade Now</button>",
            async function (a, b) {
              a.hide({ transitionOut: "fadeOut" }, b, "button");
              window.open("https://wamessager.com/pricing", "_blank");
            },
            !0,
          ],
        ],
        onClosing: function (a, b, c) {},
        onClosed: function (a, b, c) {},
      });
    },
    l = (a) =>
      new Promise((b, c) =>
        chrome.storage.local.set(a, (d) => {
          chrome.runtime.lastError
            ? c(Error(chrome.runtime.lastError.message))
            : b();
        })
      ),
    n = (a) =>
      new Promise((b, c) =>
        chrome.storage.local.get(a, (d) => {
          chrome.runtime.lastError
            ? c(Error(chrome.runtime.lastError.message))
            : b(void 0 == d ? null : d);
        })
      );
  $("#msg_preview_button").click(async function () {
    var a = await n("attachment_data");
    a.attachment_data
      ? (a = a.attachment_data)
      : ((a = []), l({ attachment_data: a }));
    if (
      "" === document.getElementById("message").value.trim() &&
      (1 > a.length || !G)
    )
      iziToast.error({
        title: "Error",
        message: "Text Message can not be empty or add Some Attachment",
        displayMode: 0,
        position: "topRight",
      });
    else {
      var b = $("#myNumber").text().split(",");
      let c = document.getElementById("addTimeStamp_option").checked;
      a = {
        command: "start messaging background",
        is_image: G && 0 < a.length,
        arr: b,
        timeDelayFrom: v,
        timeDelayTo: w,
        is_time_stamp: c,
        batched: !1,
        message: document.getElementById("message").value,
        premium: q,
        is_unsubscribe: L,
      };
      chrome.runtime.sendMessage({ context: a });
      iziToast.success({
        title: "Success",
        message: "Kindly Check Preview Message sent to your Whatsapp Number",
        displayMode: 0,
        position: "topRight",
      });
    }
  });
  $("#onboardingSend").click(async (a) => {
    B = {
      command: "start messaging background",
      is_image: !1,
      arr: $("#onboardingNumber").val().split(","),
      timeDelayFrom: v,
      timeDelayTo: w,
      is_time_stamp: !0,
      batched: !1,
      message: document.getElementById("onboardingMessage").value,
      premium: q,
      is_unsubscribe: L,
    };
    chrome.runtime.sendMessage({ context: B });
    $("#onboarding,#unsynced").hide();
    $("#loadingScreen").show();
    l({ onBoarding: !0 });
    oa();
    $("#Enhancement").click();
  });
  $("#reviewFooter").click(async (a) => {
    ("review clicked");
    l({ reviewAskLastDate: Date.now() });
    a = chrome.i18n.getMessage("iziToastReviewMessage");
    q || (a += chrome.i18n.getMessage("iziToastReviewMessageOffer"));
    iziToast.question({
      timeout: 2e4,
      close: !1,
      color: "green",
      overlay: !0,
      animateInside: !0,
      iconUrl: "./assets/star.svg",
      displayMode: "once",
      id: "question",
      zindex: 999,
      title: chrome.i18n.getMessage("iziToastReviewTitle"),
      message: a,
      position: "center",
      buttons: [
        [
          "<button>Not now</button>",
          function (b, c) {
            b.hide({ transitionOut: "fadeOut" }, c, "button");
          },
        ],
        [
          "<button>Rate Us 5 Stars</button>",
          async function (b, c) {
            b.hide({ transitionOut: "fadeOut" }, c, "button");
            window.open(
              "https://chrome.google.com/webstore/detail/best-wa-sender-free-softw/afgbckekjlfkfhklldgdndiagddhbohm/reviews",
              "_blank"
            );
            l({ reviewUs: !0 });
          },
          !0,
        ],
      ],
      onClosing: function (b, c, d) {},
      onClosed: function (b, c, d) {},
    });
  });
});
