/*!
 *   simpleCommentReply.js
 * See {@link https://github.com/dettalant/simpleCommentReply}
 *
 * @author dettalant
 * @version v0.1.1
 * @license MIT License
 */
var simpleCommentReply = (function (exports) {
  'use strict';

  var SimpleCommentReplyError = function SimpleCommentReplyError(message) {
      this.message = message;
      this.name = "SimpleCommentReplyError";
  };
  SimpleCommentReplyError.prototype.toString = function toString () {
      return this.name + ": " + this.message;
  };
  var SimpleCommentReply = function SimpleCommentReply(args) {
      // 件名欄に返信ユーザー名より前に付け足される文字列
      this.subjectBeforeName = "";
      // 件名欄に返信ユーザー名より後に付け足される文字列
      this.subjectPostName = " さんへの返信";
      // 初期化時例外処理
      if (typeof args === "undefined") {
          throw new SimpleCommentReplyError("初期化には引数となるオブジェクトが必要です");
      }
      else if (typeof args.formEl === "undefined") {
          throw new SimpleCommentReplyError("初期化用引数オブジェクトにformElが存在しない");
      }
      else if (typeof args.formSubjectEl === "undefined") {
          throw new SimpleCommentReplyError("run()関数の引数オブジェクトにformElが存在しない");
      }
      else if (!(args.formEl instanceof HTMLElement)) {
          throw new SimpleCommentReplyError("初期化用引数formElがHTMLElementでない");
      }
      else if (!(args.formSubjectEl instanceof HTMLInputElement)) {
          throw new SimpleCommentReplyError("初期化用引数formSubjectElがHTMLInputElementでない");
      }
      this.formEl = args.formEl;
      this.formSubjectEl = args.formSubjectEl;
      if (typeof args.subjectBeforeName !== "undefined" && args.subjectBeforeName !== "") {
          this.subjectBeforeName = args.subjectBeforeName;
      }
      if (typeof args.subjectPostName !== "undefined" && args.subjectPostName !== "") {
          this.subjectPostName = args.subjectPostName;
      }
  };
  SimpleCommentReply.prototype.formSubjectOverwrite = function formSubjectOverwrite (targetEl) {
      if (this.formSubjectEl instanceof HTMLInputElement) {
          // targetElのdata-author-nameからコメント者の名前を取得
          var commentAuthorName = (typeof targetEl.dataset.authorName !== "undefined") ? targetEl.dataset.authorName : "";
          // 取得した名前を整形して件名欄に入力
          this.formSubjectEl.value = this.subjectBeforeName + commentAuthorName + this.subjectPostName;
      }
  };
  SimpleCommentReply.prototype.scrollToFormTop = function scrollToFormTop () {
      this.formEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
      });
  };
  SimpleCommentReply.prototype.reply = function reply (targetEl) {
      this.formSubjectOverwrite(targetEl);
      this.scrollToFormTop();
  };

  exports.SimpleCommentReply = SimpleCommentReply;
  exports.SimpleCommentReplyError = SimpleCommentReplyError;

  return exports;

}({}));
