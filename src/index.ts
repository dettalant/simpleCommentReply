export class SimpleCommentReplyError implements Error {
  public name = "SimpleCommentReplyError";

  constructor(public message: string) {}

  toString() {
    return this.name + ": " + this.message;
  }
}

interface InitArgs {
  formEl: HTMLFormElement | null;
  formSubjectEl: HTMLInputElement | null;
  subjectBeforeName?: string;
  subjectPostName?: string;
}

export class SimpleCommentReply {
  formEl: HTMLFormElement;
  formSubjectEl: HTMLInputElement;
  // 件名欄に返信ユーザー名より前に付け足される文字列
  subjectBeforeName: string = "";
  // 件名欄に返信ユーザー名より後に付け足される文字列
  subjectPostName: string = " さんへの返信";

  constructor(args: InitArgs) {
    // 初期化時例外処理
    if (typeof args === "undefined") {
      throw new SimpleCommentReplyError("初期化には引数となるオブジェクトが必要です");
    } else if (typeof args.formEl === "undefined") {
      throw new SimpleCommentReplyError("初期化用引数オブジェクトにformElが存在しない");
    } else if (typeof args.formSubjectEl === "undefined") {
      throw new SimpleCommentReplyError("初期化用引数オブジェクトにformSubjectElが存在しない");
    } else if (!(args.formEl instanceof HTMLElement)) {
      throw new SimpleCommentReplyError("初期化用引数formElがHTMLElementでない");
    } else if (!(args.formSubjectEl instanceof HTMLInputElement)) {
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
  }

  formSubjectOverwrite(targetEl: HTMLElement) {
    if (this.formSubjectEl instanceof HTMLInputElement) {
      // targetElのdata-author-nameからコメント者の名前を取得
      const commentAuthorName = (typeof targetEl.dataset.authorName !== "undefined") ? targetEl.dataset.authorName : "";

      // 取得した名前を整形して件名欄に入力
      this.formSubjectEl.value = this.subjectBeforeName + commentAuthorName +  this.subjectPostName;
    }
  }

  scrollToFormTop() {
    this.formEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  public reply(targetEl: HTMLElement) {
    this.formSubjectOverwrite(targetEl);
    this.scrollToFormTop();
  }
}
