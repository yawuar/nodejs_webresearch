$(document).ready(function(){

  $('#add_user').on('submit', function(){

      var user = $('#add_user').serializeArray();

      $.ajax({
        type: 'POST',
        url: '/user',
        data: {
          firstname: user[0]['value'],
          lastname: user[1]['value'],
          address: user[2]['value']
        },
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  var firstname, lastname, address;
  $('.btn').click(function(e) {
    var id = $(e.currentTarget).data('id');
    $(e.currentTarget).addClass('clicked');
    $.ajax({
      type: 'GET',
      url: '/user/' + id,
      async: false,
      data: {
        id: id
      },
      success: function(data){
        firstname = data['firstname'];
        lastname = data['lastname'];
        address = data['address'];
      }
    });

    $('#firstname').val(firstname);
    $('#lastname').val(lastname);
    $('#address').val(address);
    $('#id').val(id);

       $('#edit_user').on('submit', function(){

          var edit_user = $('#edit_user').serializeArray();$
          $.ajax({
            type: 'PUT',
            url: '/user/' + id,
            data: {
              firstname: edit_user[0]['value'],
              lastname: edit_user[1]['value'],
              address: edit_user[2]['value']
            },
            success: function(val){
              // console.log(val);
              //do something with the data via front-end framework
            }
          });
          location.reload();
    });

  });

  $('.btn.btn-danger').click(function(e) {
      var id = $(e.currentTarget).data('id');
      $.ajax({
        type: 'delete',
        url: '/user/' + id,
        success: function(data){
          //do something with the data via front-end framework
          // location.reload();
        }
      });

      location.reload();
  });

});
