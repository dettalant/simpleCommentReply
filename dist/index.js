/*!
 *   fc2_comment_reply.js
 * See {@link https://github.com/dettalant/fc2fc2_comment_reply}
 *
 * @author dettalant
 * @version v0.1.0
 * @license MIT License
 */
var strawManCommentReply = (function(exports) {
  var commentFormId = "commentForm";
  var commentFormSubjectId = "commentFormSubject";

  var commentFormEl = document.getElementById(commentFormId);
  var commentFormSubjectEl = document.getElementById(commentFormSubjectId);

  if (!commentFormEl || !commentFormSubjectEl) {
    console.error("strawManCommentReply: 必須要素の取得に失敗！")
  }

  var reply = function (el) {
    formSubjectOverwrite(el);
    scrollToFormTop();
  }
  var formSubjectOverwrite = function (el) {
    var commentAuthorName = (typeof el.dataset.authorName !== "undefined") ? el.dataset.authorName : "";
    commentFormSubjectEl.value = commentAuthorName +  " さんへの返信";
  }

  var scrollToFormTop = function () {
    commentFormEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  exports.reply = reply;

  return exports;
}({}))

