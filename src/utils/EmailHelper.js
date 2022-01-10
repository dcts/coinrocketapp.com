
class EmailHelper {

  static sendMail() {
    const email = {
      subject: "👋 Hello",
      body: "",
    };
    window.location.href = EmailHelper.buildMailtoString("<INSERT_TARGET_EMAIL>", email.subject, email.body);
  };

  /*
   * Helper methods to generate mailto string
   * encodeText
   * - encodes newline with `%0d`
   * - encodes space with `%20`
   */
  static encodeText(text) {
    return text.split("\n").join("%0a").split(" ").join("%20");
  }
  static buildMailtoString(receiverEmail, subject, body) {
    return `mailto:${receiverEmail}?subject=${EmailHelper.encodeText(subject)}&body=${EmailHelper.encodeText(body)}`;
  };
};

export default EmailHelper;
