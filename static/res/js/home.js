(function($) {
  $.get('/api/user/getUserInfo', function(res) {
    console.log(res)
  })
})(jQuery)
