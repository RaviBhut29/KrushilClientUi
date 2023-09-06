$(document).ready(function () {
  let navigation = $(".navbar");
  let menu_btn = $(".menu-btn");
  let close_btn = $(".close-btn");
  let img_profile = $(".img_profile");
  let userDropdown = $(".userDropdown");
  let on_mobile_navbar = $(".on-mobile-navbar");

  // $(menu_btn).focus(function () {
  //   $(on_mobile_navbar).show();
  // });

  // $(close_btn).click(function () {
  //   $(on_mobile_navbar).hide();
  // });

  // $(img_profile).click(function () {
  //   $(userDropdown).toggleClass("open");
  // });

  //$(document).ready(function () {
  // $('.nav-search').on('focus',function(){
  //     $('.nav-search').parent().siblings('a, .s_hide').hide();
  //     $('.nav-search-img').hide();
  //     $('.nav-search').addClass('nav-search-class');
  //     $('.ddl_search').addClass('ddl_search_active');
  // });

  // $('.nav-search').on('blur',function(){
  //     $('.nav-search').parent().siblings('a, .s_hide').show();
  //     $('.nav-search-img').show();
  //     $('.nav-search').removeClass('nav-search-class');
  //     $('.ddl_search').removeClass('ddl_search_active');
  // });

  $(".Services").on("click", function () {
    $(".ddl").toggleClass("active-ddl");
  });
});
