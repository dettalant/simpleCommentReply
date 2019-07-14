/*!
 *   fc2_comment_reply.js
 * See {@link https://github.com/dettalant/fc2fc2_comment_reply}
 *
 * @author dettalant
 * @version v0.1.0
 * @license MIT License
 */
const strawManCommentReply = (function(exports) {
  const commentFormId = "commentForm";
  const commentFormSubjectId = "commentFormSubject";

  const commentFormEl = document.getElementById(commentFormId);
  const commentFormSubjectEl = document.getElementById(commentFormSubjectId);

  if (!commentFormEl || !commentFormSubjectEl) {
    console.error("strawManCommentReply: 必須要素の取得に失敗！")
  }

  const reply = (el) => {
    formSubjectOverwrite(el);
    scrollToFormTop();
  }
  const formSubjectOverwrite = (el) => {
    const commentAuthorName = (typeof el.dataset.authorName !== "undefined") ? el.dataset.authorName : "";
    commentFormSubjectEl.value = commentAuthorName +  " さんへの返信";
  }

  const scrollToFormTop = () => {
    commentFormEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  exports.reply = reply;

  return exports;
}({}))
