$(document).ready(function () {
  $(".download-triangle").on("click", function () {
    const input = $(".text-input").val();
    var date = new Date(); // for now
    var time = date.getHours().toString() + ":" + date.getMinutes().toString();

    if (input) {
      $(".chat-box").append(
        '<div class="admin-msg-div"> <span class="admin-msg-time">' +
          time +
          '</span> <p class="admin-msg">' +
          input +
          "</p> </div>"
      );

      var scrollBottom = $(".chat-box").scrollTop() + $(".chat-box").height();
      $(".chat-box").scrollTop($(".chat-box").scrollTop() + scrollBottom);
    }
    $(".text-input").val("");
  });
});
