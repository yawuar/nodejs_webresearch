$('#update').click(function(e) {
  $.ajax({
    method: 'put',
    url: '/quote/Yawuar',
    data: {
      name: 'Yawuar',
      quote: 'This is a test'
    },
    success: function(data) {
      console.log(data);
    }
  });
});

$('#delete').click(function(e) {
  $.ajax({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/quote/Yawuar',
    success: function(data) {
      console.log(data);
    }
  });
});