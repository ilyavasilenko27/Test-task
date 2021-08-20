$( function() {
    $( "#datepicker" ).datepicker();
});

let slider1 = new Slider(1000, 3000000, "slider1", "sum-deposit");
let slider2 = new Slider(1000, 3000000, "slider2", "add-deposit");

$(document).ready(function() {
    $('#form').on('submit', function(e){
      e.preventDefault();
      let valid = true;
      let data = $(this).serialize().split("&");
      data.forEach(element => {
        let dataName = element.split("=")[0];
        let datavalue = element.split("=")[1];
        if(dataName == "sum-deposit"){
          if(!(Number(datavalue) >= slider1._min && Number(datavalue) <= slider1._max)){
            valid = false;
            alert("Неправильная сумма вклада");
          }
        }
        if(dataName == "add-deposit"){
          if(!(Number(datavalue) >= slider2._min && Number(datavalue) <= slider2._max)){
            valid = false;
            alert("Неправильная сумма пополнения вклада");
          }
        }
        if(dataName == "date"){
          let dateRegular = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
          if(!dateRegular.test(datavalue)){
            valid = false;
            alert("Неверная дата офрмления вклада");
          }
        }
        if(dataName == "deposit-flag"){
          if(datavalue != "true" && datavalue != "false"){
            valid = false;
            alert("Неправильное значение пополнения вклада")
          }
        }
        if(dataName == "temp-deposit"){
          let numRegular = /^[0-9]*$/g;
          if(!numRegular.test(datavalue)){
            valid = false;
            alert("Неправильный срок вклада");
          }
        }
      });
      if(valid) {
        $.ajax({
            url: '/calc.php',
            method: 'post',
            dataType: 'html',
            data: $(this).serialize(),
            success: function(data){
                $('#result').html(data);
            }
        });
      }
    });
    $('#datepicker').on('change', function(e){
      let date = $('#datepicker').val().split("/");
      $('#datepicker').val(date[1]+ "." + date[0]+ "." + date[2]);
    });
  });
