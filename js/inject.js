"use strict";
(function () {
  function l() {
    function a(b) {
      let c = 0,
        e = [
          {
            id: "WAMStore",
            conditions: (d) =>
              d.default && d.default.Chat && d.default.Msg ? d.default : null,
          },
          {
            id: "WAMMediaCollection",
            conditions: (d) =>
              d.default &&
              d.default.prototype &&
              d.default.prototype.processAttachments
                ? d.default
                : null,
          },
          { id: "WAMMediaProcess", conditions: (d) => (d.BLOB ? d : null) },
          { id: "WAMWap", conditions: (d) => (d.createGroup ? d : null) },
          {
            id: "WAMServiceWorker",
            conditions: (d) =>
              d.default && d.default.killServiceWorker ? d : null,
          },
          {
            id: "WAMState",
            conditions: (d) => (d.WAMState && d.STREAM ? d : null),
          },
          {
            id: "WAMWapDelete",
            conditions: (d) =>
              d.sendConversationDelete && 2 == d.sendConversationDelete.length
                ? d
                : null,
          },
          {
            id: "WAMConn",
            conditions: (d) =>
              d.default && d.default.ref && d.default.refTTL ? d.default : null,
          },
          {
            id: "WAMWapQuery",
            conditions: (d) =>
              d.default && d.default.queryExist ? d.default : null,
          },
          {
            id: "WAMCryptoLib",
            conditions: (d) => (d.decryptE2EMedia ? d : null),
          },
          {
            id: "WAMOpenChat",
            conditions: (d) =>
              d.default &&
              d.default.prototype &&
              d.default.prototype.WAMOpenChat
                ? d.default
                : null,
          },
          {
            id: "WAMUserConstructor",
            conditions: (d) =>
              d.default &&
              d.default.prototype &&
              d.default.prototype.isServer &&
              d.default.prototype.isUser
                ? d.default
                : null,
          },
          {
            id: "WAMSendTextMsgToChat",
            conditions: (d) =>
              d.WAMSendTextMsgToChat ? d.WAMSendTextMsgToChat : null,
          },
          {
            id: "WAMWidFactory",
            conditions: (d) => (d.createUserWid ? d : null),
          },
          {
            id: "WAMSendSeen",
            conditions: (d) => (d.WAMSendSeen ? d.WAMSendSeen : null),
          },
          {
            id: "WAMsendDelete",
            conditions: (d) => (d.WAMsendDelete ? d.WAMsendDelete : null),
          },
          {
            id: "WAMCmd",
            conditions: function (d) {
              return d.default && d.default.openModalMedia ? d.default : null;
            },
          },
          {
            id: "WAMMe",
            conditions: function (d) {
              return d.PLATFORMS && d.WAMConn ? d.default : null;
            },
          },
          {
            id: "WAMEnumTypes",
            conditions: function (d, g) {
              return d?.MEDIA_PICKER_ORIGIN_TYPE ? d : null;
            },
          },
        ];
      for (let d in b)
        if (
          "object" === typeof b[d] &&
          null !== b[d] &&
          (e.forEach((g) => {
            if (g.conditions && !g.foundedModule) {
              var h = g.conditions(b[d]);
              null !== h && (c++, (g.foundedModule = h));
            }
          }),
          c == e.length)
        )
          break;
      let f = e.find((d) => "WAMStore" === d.id);
      window.WAMStore = f.foundedModule ? f.foundedModule : {};
      e.splice(e.indexOf(f), 1);
      e.forEach((d) => {
        d.foundedModule && (window.WAMStore[d.id] = d.foundedModule);
      });
      window.WAMStore.Chat.modelClass.prototype.sendMessage = function (d) {
        window.WAMStore.WAMSendTextMsgToChat(this, ...arguments);
      };
      return window.WAMStore;
    }
    return new Promise((b, c) => {
      null == document.querySelector("#pane-side") && c("Page not loaded yet");
      if (2.3 > parseFloat(window.Debug.VERSION)) {
        if (
          "function" === typeof webpackJsonp ||
          webpackChunkwhatsapp_web_client
        )
          if ("function" === typeof webpackJsonp)
            webpackJsonp(
              [],
              {
                parasite: (e, f, d) => {
                  try {
                    a(d), b();
                  } catch (g) {
                    c(g);
                  }
                },
              },
              ["parasite"]
            );
          else {
            let e = new Date().getTime();
            webpackChunkwhatsapp_web_client.push([
              ["parasite" + e],
              {},
              function (f, d, g) {
                d = [];
                for (let h in f.m) (g = f(h)), d.push(g);
                try {
                  a(d), b();
                } catch (h) {
                  c(h);
                }
              },
            ]);
          }
      } else {
        let e = {},
          f = self.require("__debug").modulesMap;
        Object.keys(f)
          .filter((d) => d.includes("WA"))
          .forEach(function (d) {
            let g = f[d];
            if (
              g &&
              ((e[d] = { default: g.defaultExport, factory: g.factory, ...g }),
              0 == Object.keys(e[d].default).length)
            )
              try {
                self.ErrorGuard.skipGuardGlobal(!0),
                  Object.assign(e[d], self.importNamespace(d));
              } catch (h) {}
          });
        try {
          a(e), b();
        } catch (d) {
          c(d);
        }
      }
    });
  }
  var m = setInterval(() => {
    l()
      .then(() => {
        window.WAMStore.Chat._find ||
          ((window.WAMStore.Chat._findAndParse =
            window.WAMStore.BusinessProfile._findAndParse),
          (window.WAMStore.Chat._find = window.WAMStore.BusinessProfile._find));
        window.WAM = { lastRead: {} };
        window.WAM._serializeRawObj = (a) => {
          if (a) {
            let b = {};
            a = a.toJSON ? a.toJSON() : { ...a };
            for (let c in a)
              "id" === c
                ? (b[c] = { ...a[c] })
                : "object" !== typeof a[c] || Array.isArray(a[c])
                ? (b[c] = a[c])
                : (b[c] = window.WAM._serializeRawObj(a[c]));
            return b;
          }
          return {};
        };
        window.WAM._serializeChatObj = (a) =>
          void 0 == a
            ? null
            : Object.assign(window.WAM._serializeRawObj(a), {
                kind: a.kind,
                isGroup: a.isGroup,
                contact: a.contact
                  ? window.WAM._serializeContactObj(a.contact)
                  : null,
                groupMetadata: a.groupMetadata
                  ? window.WAM._serializeRawObj(a.groupMetadata)
                  : null,
                presence: a.presence
                  ? window.WAM._serializeRawObj(a.presence)
                  : null,
                msgs: null,
              });
        window.WAM._serializeContactObj = (a) =>
          void 0 == a
            ? null
            : Object.assign(window.WAM._serializeRawObj(a), {
                formattedName: a.formattedName,
                displayName: a.displayName,
                isHighLevelVerified: a.isHighLevelVerified,
                isMe: a.isMe,
                isMyContact: a.isMyContact,
                isPSA: a.isPSA,
                isUser: a.isUser,
                isVerified: a.isVerified,
                isWAContact: a.isWAContact,
                profilePicThumbObj: a.profilePicThumb
                  ? WAM._serializeProfilePicThumb(a.profilePicThumb)
                  : {},
                statusMute: a.statusMute,
                msgs: null,
              });
        window.WAM._serializeMessageObj = (a) =>
          void 0 == a
            ? null
            : Object.assign(
                window.WAM._serializeRawObj(a),
                window.WAM._serializeRawObj({
                  id: a.id._serialized,
                  sender: a.senderObj
                    ? WAM._serializeContactObj(a.senderObj)
                    : null,
                  timestamp: a.t,
                  content: a.body,
                  isGroupMsg: a.isGroupMsg,
                  isLink: a.isLink,
                  isMMS: a.isMMS,
                  isMedia: a.isMedia,
                  isNotification: a.isNotification,
                  isPSA: a.isPSA,
                  type: a.type,
                  chat: WAM._serializeChatObj(a.chat),
                  chatId: a.id.remote,
                  quotedMsgObj: WAM._serializeMessageObj(a._quotedMsgObj),
                  mediaData: window.WAM._serializeRawObj(a.mediaData),
                })
              );
        window.WAM._serializeNumberStatusObj = (a) =>
          void 0 == a
            ? null
            : Object.assign(
                {},
                window.WAM._serializeRawObj({
                  id: a.jid,
                  status: a.status,
                  isBusiness: !0 === a.biz,
                  canReceiveMessage: 200 === a.status,
                })
              );
        window.WAM._serializeProfilePicThumb = (a) =>
          void 0 == a
            ? null
            : Object.assign(
                {},
                window.WAM._serializeRawObj({
                  eurl: a.eurl,
                  id: a.id,
                  img: a.img,
                  imgFull: a.imgFull,
                  raw: a.raw,
                  tag: a.tag,
                })
              );
        window.WAM.createGroup = function (a, b) {
          Array.isArray(b) || (b = [b]);
          return window.WAMStore.WAMWap.createGroup(a, b);
        };
        window.WAM.leaveGroup = function (a) {
          a = "string" == typeof a ? a : a._serialized;
          return WAM.getChat(a).sendExit();
        };
        window.WAM.getAllContacts = function (a) {
          const b = window.WAMStore.Contact.map((c) =>
            WAM._serializeContactObj(c)
          );
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getMyContacts = function (a) {
          const b = window.WAMStore.Contact.filter(
            (c) => !0 === c.isMyContact
          ).map((c) => WAM._serializeContactObj(c));
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getContact = function (a, b) {
          a = window.WAMStore.Contact.get(a);
          void 0 !== b && b(window.WAM._serializeContactObj(a));
          return window.WAM._serializeContactObj(a);
        };
        window.WAM.getAllChats = function (a) {
          const b = window.WAMStore.Chat.map((c) => WAM._serializeChatObj(c));
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.haveNewMsg = function (a) {
          return 0 < a.unreadCount;
        };
        window.WAM.getAllChatsWithNewMsg = function (a) {
          const b = window.WAMStore.Chat.filter(window.WAM.haveNewMsg).map(
            (c) => WAM._serializeChatObj(c)
          );
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getAllChatIds = function (a) {
          const b = window.WAMStore.Chat.map((c) => c.id._serialized || c.id);
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getAllGroups = async function (a) {
          const b = await Promise.all(
            window.WAMStore.Chat.filter((c) => c.isGroup).map((c) =>
              window.WAMStore.GroupMetadata.update(c.id).then(() => {
                let { participants: e } = c.groupMetadata;
                e = e
                  .map((f) => f.contact)
                  .filter((f) => !f.isMe)
                  .map((f) => window.WAM._serializeContactObj(f));
                return Object.assign(window.WAM._serializeChatObj(c), {
                  participants: e,
                });
              })
            )
          );
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getAllLabels = async function (a) {
          const b = window.WAMStore.Label.map((e) => ({
              labelName: e.name,
              labelId: e.id,
            })),
            c = window.WAMStore.Chat.filter(
              (e) => e.labels && 0 < e.labels.length
            ).map((e) => {
              let f = b.filter((d, g) => e.labels.includes(d.labelId));
              return Object.assign(WAM._serializeChatObj(e), { labels: f });
            });
          void 0 !== a && a(c);
          return c;
        };
        window.WAM.getAllBroadcasts = async function (a) {
          const b = await Promise.all(
            window.WAMStore.Chat.filter((c) => c.isBroadcast).map((c) => {
              return c;
            })
          );
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getChat = function (a, b) {
          a = "string" == typeof a ? a : a._serialized;
          a = window.WAMStore.Chat.get(a);
          a.sendMessage = a.sendMessage
            ? a.sendMessage
            : function () {
                return window.WAMStore.sendMessage.apply(this, arguments);
              };
          void 0 !== b && b(a);
          return a;
        };
        window.WAM.getChatByName = function (a, b) {
          const c = window.WAM.getAllChats().find((e) => e.name.includes(a));
          void 0 !== b && b(c);
          return c;
        };
        window.WAM.sendImageFromDatabasePicBot = function (a, b, c) {
          var e = window.WAM.getChatByName("DATABASEPICBOT").msgs.find(
            (d) => d.caption == a
          );
          if (void 0 === e || void 0 === WAM.getChat(b)) return !1;
          const f = e.caption;
          e.id.id = window.WAM.getNewId();
          e.id.remote = b;
          e.t = Math.ceil(new Date().getTime() / 1e3);
          e.to = b;
          e.caption = void 0 !== c && "" !== c ? c : "";
          e.collection.send(e).then(function (d) {
            e.caption = f;
          });
          return !0;
        };
        window.WAM.sendMessageWithThumb = function (a, b, c, e, f, d, g) {
          d = WAM.getChat(d);
          if (void 0 === d) return void 0 !== g && g(!1), !1;
          d.sendMessage(f, {
            linkPreview: {
              canonicalUrl: b,
              description: e,
              matchedText: b,
              title: c,
              thumbnail: a,
              compose: !0,
            },
            mentionedJidList: [],
            quotedMsg: null,
            quotedMsgAdminGroupJid: null,
          });
          void 0 !== g && g(!0);
          return !0;
        };
        window.WAM.getNewId = function () {
          for (var a = "", b = 0; 20 > b; b++)
            a +=
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
                Math.floor(62 * Math.random())
              );
          return a;
        };
        window.WAM.getChatById = function (a, b) {
          a = (a = WAM.getChat(a)) ? WAM._serializeChatObj(a) : !1;
          void 0 !== b && b(a);
          return a;
        };
        window.WAM.getUnreadMessagesInChat = function (a, b, c, e) {
          a = WAM.getChat(a).msgs._models;
          let f = [];
          for (let g = a.length - 1; 0 <= g; g--)
            if ("remove" !== g) {
              var d = a[g];
              "boolean" === typeof d.isNewMsg &&
                !1 !== d.isNewMsg &&
                ((d.isNewMsg = !1),
                (d = WAM.processMessageObj(d, b, c)) && f.push(d));
            }
          void 0 !== e && e(f);
          return f;
        };
        window.WAM.loadEarlierMessages = function (a, b) {
          a = WAM.getChat(a);
          void 0 !== b
            ? a.loadEarlierMsgs().then(function () {
                b();
              })
            : a.loadEarlierMsgs();
        };
        window.WAM.loadAllEarlierMessages = function (a, b) {
          const c = WAM.getChat(a);
          let e = function () {
            c.msgs.msgLoadState.noEarlierMsgs
              ? b && b()
              : c.loadEarlierMsgs().then(e);
          };
          e();
        };
        window.WAM.asyncLoadAllEarlierMessages = function (a, b) {
          b();
          window.WAM.loadAllEarlierMessages(a);
        };
        window.WAM.areAllMessagesLoaded = function (a, b) {
          if (!WAM.getChat(a).msgs.msgLoadState.noEarlierMsgs)
            return b && b(!1), !1;
          b && b(!0);
          return !0;
        };
        window.WAM.loadEarlierMessagesTillDate = function (a, b, c) {
          const e = WAM.getChat(a);
          let f = function () {
            e.msgs.models[0].t > b && !e.msgs.msgLoadState.noEarlierMsgs
              ? e.loadEarlierMsgs().then(f)
              : c();
          };
          f();
        };
        window.WAM.getAllGroupMetadata = function (a) {
          const b = window.WAMStore.GroupMetadata.map((c) => c.all);
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.getGroupMetadata = async function (a, b) {
          let c = window.WAMStore.GroupMetadata.get(a);
          void 0 !== c &&
            c.stale &&
            (await window.WAMStore.GroupMetadata.update(a));
          void 0 !== b && b(c);
          return c;
        };
        window.WAM._getGroupParticipants = async function (a) {
          return (await WAM.getGroupMetadata(a)).participants;
        };
        window.WAM.getGroupParticipantIDs = async function (a, b) {
          a = (await WAM._getGroupParticipants(a)).map((c) => c.id);
          void 0 !== b && b(a);
          return a;
        };
        window.WAM.getGroupAdmins = async function (a, b) {
          a = (await WAM._getGroupParticipants(a))
            .filter((c) => c.isAdmin)
            .map((c) => c.id);
          void 0 !== b && b(a);
          return a;
        };
        window.WAM.getMe = function (a) {
          const b = window.WAMStore.Contact.filter((c) => !0 === c.isMe).map(
            (c) => WAM._serializeContactObj(c)
          );
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.isLoggedIn = function (a) {
          const b =
            window.WAMStore.Contact &&
            void 0 !== window.WAMStore.Contact.checksum;
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.isConnected = function (a) {
          const b =
            null !== document.querySelector('*[data-icon="alert-phone"]') ||
            null !== document.querySelector('*[data-icon="alert-computer"]')
              ? !1
              : !0;
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.processMessageObj = function (a, b, c) {
          if (a.isNotification) {
            if (c) return WAM._serializeMessageObj(a);
          } else if (!1 === a.id.fromMe || b)
            return WAM._serializeMessageObj(a);
        };
        window.WAM.getAllMessagesInChat = function (a, b, c, e) {
          let f = [];
          a = WAM.getChat(a).msgs._models;
          for (const d in a) {
            if ("remove" === d) continue;
            let g = WAM.processMessageObj(a[d], b, c);
            g && f.push(g);
          }
          void 0 !== e && e(f);
          return f;
        };
        window.WAM.getAllMessageIdsInChat = function (a, b, c, e) {
          let f = [];
          a = WAM.getChat(a).msgs._models;
          for (const d in a)
            "remove" === d ||
              (!b && a[d].isMe) ||
              (!c && a[d].isNotification) ||
              f.push(a[d].id._serialized);
          void 0 !== e && e(f);
          return f;
        };
        window.WAM.getMessageById = function (a, b) {
          let c = !1;
          try {
            let e = window.WAMStore.Msg.get(a);
            e && (c = WAM.processMessageObj(e, !0, !0));
          } catch (e) {}
          if (void 0 !== b) b(c);
          else return c;
        };
        window.WAM.ReplyMessage = function (a, b, c) {
          a = window.WAMStore.Msg.get(a);
          if (void 0 === a) return void 0 !== c && c(!1), !1;
          const e = WAM.getChat(a.chat.id);
          if (void 0 !== e)
            return (
              void 0 !== c
                ? e.sendMessage(b, { quotedMsg: a }, a).then(function () {
                    function f(h) {
                      return new Promise((k) => setTimeout(k, h));
                    }
                    function d() {
                      for (let h = e.msgs.models.length - 1; 0 <= h; h--) {
                        let k = e.msgs.models[h];
                        if (k.senderObj.isMe && k.body == b)
                          return c(WAM._serializeMessageObj(k)), True;
                      }
                      g += 1;
                      30 < g ? c(!0) : f(500).then(d);
                    }
                    var g = 0;
                    d();
                  })
                : e.sendMessage(b, { quotedMsg: a }, a),
              !0
            );
          void 0 !== c && c(!1);
          return !1;
        };
        window.WAM.sendMessageToID = function (a, b, c) {
          try {
            (window.getContact = (f) => WAMStore.WAMWapQuery.queryExist(f)),
              window.getContact(a).then((f) => {
                404 === f.status
                  ? c(!0)
                  : WAMStore.Chat.find(f.jid)
                      .then((d) => {
                        d.sendMessage(b);
                        return !0;
                      })
                      .catch((d) => {
                        if (WAM.sendMessage(a, b)) return c(!0), !0;
                        c(!1);
                        return !1;
                      });
              });
          } catch (f) {
            if (0 === window.WAMStore.Chat.length) return !1;
            let d = WAMStore.Chat.models[0];
            var e = d.id;
            d.id =
              "string" === typeof e
                ? a
                : new window.WAMStore.WAMUserConstructor(a, {
                    intentionallyUsePrivateConstructor: !0,
                  });
            void 0 !== c
              ? d.sendMessage(b).then(function () {
                  d.id = e;
                  c(!0);
                })
              : (d.sendMessage(b), (d.id = e));
            return !0;
          }
          void 0 !== c && c(!1);
          return !1;
        };
        window.WAM.sendMessage = function (a, b, c) {
          var e = WAM.getChat(a);
          if (void 0 !== e)
            return (
              void 0 !== c
                ? e.sendMessage(b).then(function () {
                    function f(h) {
                      return new Promise((k) => setTimeout(k, h));
                    }
                    function d() {
                      for (let h = e.msgs.models.length - 1; 0 <= h; h--) {
                        let k = e.msgs.models[h];
                        if (k.senderObj.isMe && k.body == b)
                          return c(WAM._serializeMessageObj(k)), True;
                      }
                      g += 1;
                      30 < g ? c(!0) : f(500).then(d);
                    }
                    var g = 0;
                    d();
                  })
                : e.sendMessage(b),
              !0
            );
          void 0 !== c && c(!1);
          return !1;
        };
        window.WAM.sendMessage2 = function (a, b, c) {
          a = WAM.getChat(a);
          if (void 0 !== a)
            try {
              return (
                void 0 !== c
                  ? a.sendMessage(b).then(function () {
                      c(!0);
                    })
                  : a.sendMessage(b),
                !0
              );
            } catch (e) {
              return void 0 !== c && c(!1), !1;
            }
          void 0 !== c && c(!1);
          return !1;
        };
        window.WAM.WAMSendSeen = function (a, b) {
          a = window.WAM.getChat(a);
          if (void 0 !== a)
            return (
              void 0 !== b
                ? (void 0 === a.getLastMsgKeyForAction &&
                    (a.getLastMsgKeyForAction = function () {}),
                  WAMStore.WAMSendSeen(a, !1).then(function () {
                    b(!0);
                  }))
                : WAMStore.WAMSendSeen(a, !1),
              !0
            );
          void 0 !== b && b();
          return !1;
        };
        window.WAM.getUnreadMessages = function (a, b, c, e) {
          const f = window.WAMStore.Chat.models;
          let d = [];
          for (let r in f) {
            if (isNaN(r)) continue;
            let q = f[r],
              n = WAM._serializeChatObj(q);
            n.messages = [];
            var g = q.msgs._models;
            for (var h = g.length - 1; 0 <= h; h--) {
              var k = g[h];
              "boolean" == typeof k.isNewMsg &&
                !1 !== k.isNewMsg &&
                ((k.isNewMsg = !1),
                (k = WAM.processMessageObj(k, a, b)) && n.messages.push(k));
            }
            if (0 < n.messages.length) d.push(n);
            else if (c) {
              h = q.unreadCount;
              for (k = g.length - 1; 0 <= k; k--) {
                var p = g[k];
                if (0 < h)
                  p.isSentByMe ||
                    ((p = WAM.processMessageObj(p, a, b)),
                    n.messages.unshift(p),
                    --h);
                else if (-1 === h) {
                  if (!p.isSentByMe) {
                    g = WAM.processMessageObj(p, a, b);
                    n.messages.unshift(g);
                    break;
                  }
                } else break;
              }
              0 < n.messages.length && ((q.unreadCount = 0), d.push(n));
            }
          }
          void 0 !== e && e(d);
          return d;
        };
        window.WAM.getGroupOwnerID = async function (a, b) {
          a = (await WAM.getGroupMetadata(a)).owner.id;
          void 0 !== b && b(a);
          return a;
        };
        window.WAM.getCommonGroups = async function (a, b) {
          let c = [],
            e = await window.WAM.getAllGroups();
          for (let f in e)
            try {
              (await window.WAM.getGroupParticipantIDs(e[f].id)).filter(
                (d) => d == a
              ).length && c.push(e[f]);
            } catch (d) {}
          void 0 !== b && b(c);
          return c;
        };
        window.WAM.getProfilePicSmallFromId = function (a, b) {
          window.WAMStore.ProfilePicThumb.find(a).then(
            function (c) {
              void 0 !== c.img
                ? window.WAM.downloadFileWithCredentials(c.img, b)
                : b(!1);
            },
            function (c) {
              b(!1);
            }
          );
        };
        window.WAM.getProfilePicFromId = function (a, b) {
          window.WAMStore.ProfilePicThumb.find(a).then(
            function (c) {
              void 0 !== c.imgFull
                ? window.WAM.downloadFileWithCredentials(c.imgFull, b)
                : b(!1);
            },
            function (c) {
              b(!1);
            }
          );
        };
        window.WAM.downloadFileWithCredentials = function (a, b) {
          let c = new XMLHttpRequest();
          c.onload = function () {
            if (4 == c.readyState)
              if (200 == c.status) {
                let e = new FileReader();
                e.readAsDataURL(c.response);
                e.onload = function (f) {
                  b(e.result.substr(e.result.indexOf(",") + 1));
                };
              } else console.error(c.statusText);
            else b(!1);
          };
          c.open("GET", a, !0);
          c.withCredentials = !0;
          c.responseType = "blob";
          c.send(null);
        };
        window.WAM.downloadFile = function (a, b) {
          let c = new XMLHttpRequest();
          c.onload = function () {
            if (4 == c.readyState)
              if (200 == c.status) {
                let e = new FileReader();
                e.readAsDataURL(c.response);
                e.onload = function (f) {
                  b(e.result.substr(e.result.indexOf(",") + 1));
                };
              } else console.error(c.statusText);
            else b(!1);
          };
          c.open("GET", a, !0);
          c.responseType = "blob";
          c.send(null);
        };
        window.WAM.getBatteryLevel = function (a) {
          if (window.WAMStore.WAMConn.plugged)
            return void 0 !== a && a(100), 100;
          let b = window.WAMStore.WAMConn.battery;
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.deleteConversation = function (a, b) {
          a = new window.WAMStore.WAMUserConstructor(a, {
            intentionallyUsePrivateConstructor: !0,
          });
          a = WAM.getChat(a);
          if (!a) return void 0 !== b && b(!1), !1;
          window.WAMStore.WAMsendDelete(a, !1)
            .then(() => {
              void 0 !== b && b(!0);
            })
            .catch(() => {
              void 0 !== b && b(!1);
            });
          return !0;
        };
        window.WAM.deleteMessage = function (a, b, c = !1, e) {
          a = new window.WAMStore.WAMUserConstructor(a, {
            intentionallyUsePrivateConstructor: !0,
          });
          a = WAM.getChat(a);
          if (!a) return void 0 !== e && e(!1), !1;
          Array.isArray(b) || (b = [b]);
          b = b.map((f) => window.WAMStore.Msg.get(f));
          c ? a.sendRevokeMsgs(b, a) : a.sendDeleteMsgs(b, a);
          void 0 !== e && e(!0);
          return !0;
        };
        window.WAM.checkNumberStatus = function (a, b) {
          window.WAMStore.WAMWapQuery.queryExist(a)
            .then((c) => {
              if (void 0 !== b) {
                if (void 0 === c.jid) throw 404;
                b(window.WAM._serializeNumberStatusObj(c));
              }
            })
            .catch((c) => {
              void 0 !== b &&
                b(window.WAM._serializeNumberStatusObj({ status: c, jid: a }));
            });
          return !0;
        };
        window.WAM._newMessagesQueue = [];
        window.WAM._newMessagesBuffer =
          null != sessionStorage.getItem("saved_msgs")
            ? JSON.parse(sessionStorage.getItem("saved_msgs"))
            : [];
        window.WAM._newMessagesDebouncer = null;
        window.WAM._newMessagesCallbacks = [];
        window.WAMStore.Msg.off("add");
        sessionStorage.removeItem("saved_msgs");
        window.WAM._newMessagesListener = window.WAMStore.Msg.on("add", (a) => {
          if (a && a.isNewMsg && !a.isSentByMe) {
            if ((a = window.WAM.processMessageObj(a, !1, !1)))
              window.WAM._newMessagesQueue.push(a),
                window.WAM._newMessagesBuffer.push(a);
            !window.WAM._newMessagesDebouncer &&
              0 < window.WAM._newMessagesQueue.length &&
              (window.WAM._newMessagesDebouncer = setTimeout(() => {
                let b = window.WAM._newMessagesQueue;
                window.WAM._newMessagesDebouncer = null;
                window.WAM._newMessagesQueue = [];
                let c = [];
                window.WAM._newMessagesCallbacks.forEach(function (e) {
                  void 0 !== e.callback && e.callback(b);
                  !0 === e.rmAfterUse && c.push(e);
                });
                c.forEach(function (e) {
                  e = window.WAM._newMessagesCallbacks.indexOf(e);
                  window.WAM._newMessagesCallbacks.splice(e, 1);
                });
              }, 1e3));
          }
        });
        window.WAM._unloadInform = (a) => {
          window.WAM._newMessagesBuffer.forEach((b) => {
            Object.keys(b).forEach((c) => (void 0 === b[c] ? delete b[c] : ""));
          });
          sessionStorage.setItem(
            "saved_msgs",
            JSON.stringify(window.WAM._newMessagesBuffer)
          );
          window.WAM._newMessagesCallbacks.forEach(function (b) {
            void 0 !== b.callback &&
              b.callback({
                status: -1,
                message:
                  "page will be reloaded, wait and register callback again.",
              });
          });
        };
        window.addEventListener("unload", window.WAM._unloadInform, !1);
        window.addEventListener("beforeunload", window.WAM._unloadInform, !1);
        window.addEventListener("pageunload", window.WAM._unloadInform, !1);
        window.WAM.waitNewMessages = function (a = !0, b) {
          window.WAM._newMessagesCallbacks.push({ callback: b, rmAfterUse: a });
          return !0;
        };
        window.WAM.getBufferedNewMessages = function (a) {
          let b = window.WAM._newMessagesBuffer;
          window.WAM._newMessagesBuffer = [];
          void 0 !== a && a(b);
          return b;
        };
        window.WAM.sendImage = function (a, b, c, e, f) {
          b = new window.WAMStore.WAMUserConstructor(b, {
            intentionallyUsePrivateConstructor: !0,
          });
          return WAMStore.Chat.find(b).then((d) => {
            var g = window.WAM.base64ImageToFile(a, c),
              h = new WAMStore.WAMMediaCollection(d);
            h.processAttachments([{ file: g }, 1], d, 1).then(() => {
              h.models[0].sendToChat(d, { caption: e });
              void 0 !== f && f(!0);
            });
          });
        };
        window.WAM.base64ImageToFile = function (a, b) {
          var c = a.split(",");
          a = c[0].match(/:(.*?);/)[1];
          c = atob(c[1]);
          for (var e = c.length, f = new Uint8Array(e); e--; )
            f[e] = c.charCodeAt(e);
          return new File([f], b, { type: a });
        };
        window.WAM.sendContact = function (a, b) {
          Array.isArray(b) || (b = [b]);
          b = b.map((c) => WAM.getChat(c).__x_contact);
          1 < b.length
            ? window.WAM.getChat(a).sendContactList(b)
            : 1 === b.length && window.WAM.getChat(a).sendContact(b[0]);
        };
        window.WAM.getNewMessageId = function (a) {
          var b = WAMStore.Msg.models[0].__x_id.clone();
          b.fromMe = !0;
          b.id = WAM.getNewId().toUpperCase();
          b.remote = a;
          b._serialized = `${b.fromMe}_${b.remote}_${b.id}`;
          return b;
        };
        window.WAM.sendVCard = function (a, b) {
          var c = WAMStore.Chat.get(a),
            e = Object.create(
              WAMStore.Msg.models.filter((f) => f.__x_isSentByMe)[0]
            );
          a = {
            ack: 0,
            id: window.WAM.getNewMessageId(a),
            local: !0,
            self: "out",
            t: parseInt(new Date().getTime() / 1e3),
            to: a,
            isNewMsg: !0,
          };
          Array.isArray(b)
            ? (Object.assign(a, { type: "multi_vcard", vcardList: b }),
              delete a.body)
            : (Object.assign(a, {
                type: "vcard",
                subtype: b.displayName,
                body: b.vcard,
              }),
              delete a.vcardList);
          Object.assign(e, a);
          c.addAndSendMsg(e);
        };
        window.WAM.contactBlock = function (a, b) {
          a = window.WAMStore.Contact.get(a);
          if (void 0 !== a) return a.setBlock(!0), b(!0), !0;
          b(!1);
          return !1;
        };
        window.WAM.contactUnblock = function (a, b) {
          a = window.WAMStore.Contact.get(a);
          if (void 0 !== a) return a.setBlock(!1), b(!0), !0;
          b(!1);
          return !1;
        };
        window.WAM.removeParticipantGroup = function (a, b, c) {
          window.WAMStore.WAMWapQuery.removeParticipants(a, [b]).then(() => {
            if (
              void 0 ===
              window.WAMStore.GroupMetadata.get(id).participants._index[b]
            )
              return c(!0), !0;
          });
        };
        window.WAM.promoteParticipantAdminGroup = function (a, b, c) {
          window.WAMStore.WAMWapQuery.promoteParticipants(a, [b]).then(() => {
            let e =
              window.WAMStore.GroupMetadata.get(id).participants._index[b];
            if (void 0 !== e && e.isAdmin) return c(!0), !0;
            c(!1);
            return !1;
          });
        };
        window.WAM.sendAttachment = function (a, b, c, e) {
          b = new window.WAMStore.WAMUserConstructor(b, {
            intentionallyUsePrivateConstructor: !0,
          });
          return WAMStore.Chat.find(b).then((f) => {
            var d = new WAMStore.WAMMediaCollection(f);
            d.processAttachments(
              [{ file: a }],
              WAMStore.WAMEnumTypes.MEDIA_PICKER_ORIGIN_TYPE.CHAT_PHOTO_LIBRARY,
              f
            ).then(() => {
              d._models[0].sendToChat(f, { caption: c });
              void 0 !== e && e();
            });
          });
        };
        window.WAM.demoteParticipantAdminGroup = function (a, b, c) {
          window.WAMStore.WAMWapQuery.demoteParticipants(a, [b]).then(() => {
            var e = window.WAMStore.GroupMetadata.get(id);
            if (void 0 === e) return c(!1), !1;
            e = e.participants._index[b];
            if (void 0 !== e && e.isAdmin) return c(!1), !1;
            c(!0);
            return !0;
          });
        };
      })
      .then((a) => {
        WAMinit();
        clearInterval(m);
      })
      .catch((a) => {});
  }, 1e3);
})();
async function WAMbase64toFile(l, m) {
  var a = l.split(",");
  l = a[0].match(/:(.*?);/)[1];
  a = atob(a[1]);
  for (var b = a.length, c = new Uint8Array(b); b--; ) c[b] = a.charCodeAt(b);
  return new File([c], m, { type: l });
}
async function WAMinit() {
  window.addEventListener("wam:get-contacts", async () => {
    try {
      let [l, m, a] = await WAMgetContacts();
      window.dispatchEvent(
        new CustomEvent("wam:get-contacts-ready", {
          detail: { groupList: l, chatList: m, labelList: a },
        })
      );
    } catch (l) {
      console.log(l);
    }
  });
  window.addEventListener("wam::send-attachments", async function (l) {
    try {
      const m = l.detail.number + "@c.us";
      let a;
      a = l.detail.attachment;
      const b = await JSON.parse(a.fileData),
        c = await WAMbase64toFile(b, a.fileName);
      let e = a.fileCaption;
      e = e.trim();
      if (void 0 == a.fileAddTimeStamp || a.fileAddTimeStamp)
        (e += "\n\nSent at: " + new Date().toISOString()), (e = e.trim());
      window.WAM.sendAttachment(c, m, e, () => {
        window.dispatchEvent(new CustomEvent("wam:attachments-sent"));
      });
    } catch (m) {
      console.log("Error in sending attachment", m);
    }
  });
}
async function WAMgetContacts() {
  let l = [],
    m = [],
    a = [];
  await window.WAM.getAllGroups().then((b) => {
    l = b.map((c) => {
      let e = {};
      e.groupName = c.contact.name;
      e.groupId = c.id.user;
      e.members = c.participants.map((f) => {
        let d = {};
        d.displayName = f.verifiedName || f.pushname;
        d.phoneNumber = f.id.user;
        d.isMyContact = f.isMyContact;
        d.savedName = f.name || f.displayName;
        return d;
      });
      e.metadata = c.groupMetadata.participants.map((f) => {
        let d = {};
        d.id = f.id.user;
        d.isAdmin = f.isAdmin;
        return d;
      });
      return e;
    });
  });
  m = (await window.WAM.getAllChats())
    .filter((b) => !b.isGroup)
    .map((b) => {
      let c = {},
        e = {};
      c.groupName = "All Users";
      c.groupId = "";
      e.displayName = b.contact.verifiedName || b.contact.pushname;
      e.phoneNumber = b.id.user;
      e.isMyContact = b.contact.isMyContact;
      e.savedName = b.contact.name || b.contact.displayName;
      c.members = [e];
      return c;
    });
  await window.WAM.getAllLabels().then((b) => {
    let c = {};
    a = b.forEach((e) => {
      let contactObject = {};
      contactObject.displayName = e.contact.verifiedName || e.contact.pushname;
      contactObject.phoneNumber = e.id.user;
      contactObject.isMyContact = e.contact.isMyContact;
      contactObject.savedName = e.contact.name || e.contact.displayName;
      e.labels.forEach((f) => {
        c[f.labelId] = c[f.labelId] || {};
        c[f.labelId].groupName = f.labelName;
        c[f.labelId].groupId = f.labelId;
        c[f.labelId].members = c[f.labelId].members || [];
        c[f.labelId].members.push(contactObject);
      });
    });
    a = Object.values(c);
  });
  return [l, m, a];
}
async function WAMsleep(l) {
  await chrome.runtime.sendMessage({ context: "sleep", time: l });
}
