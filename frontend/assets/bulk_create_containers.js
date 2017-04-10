$(function () {

  var init = function () {
    $('.add-containers-form .btn-close').on('click', function (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
      $('.add-containers-action').trigger("click");
    });

    // Override the default bootstrap dropdown behaviour here to
    // ensure that this modal stays open even when another modal is
    // opened within it.
    $(".add-containers-action").on("click", function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      if ($(this).attr('disabled')) {
        return;
      }

      if ($(".add-containers-form")[0].style.display === "block") {
        // Hide it
        $(".add-containers-form").css("display", "");
      } else {
        // Show it
        $(".add-containers-form").css("display", "block");
      }
    });

    // Stop the modal from being hidden by clicks within the form
    $(".add-containers-form").on("click", function(event) {
      event.stopPropagation();
    });

    $("#add_containers_container_type").on("change", function() {
      $("#container_type_error").css("display", "");
    });

    $("#add_containers_instance_type").on("change", function() {
      $("#instance_type_error").css("display", "");
    });

    $("#add_containers_container_start").on("keyup", function() {
      $("#container_start_error").css("display", "");
      $("#container_range_order_error").css("display", "");
    });

    $("#add_containers_container_end").on("keyup", function() {
      $("#container_end_error").css("display", "");
      $("#container_range_order_error").css("display", "");
      $("#container_range_size_error").css("display", "");
    });

    $(".add-containers-form .add-containers-button").on("click", function(event) {
      event.stopPropagation();
      event.preventDefault();

      var submit = true;
      var container_type_val = $("#add_containers_container_type").val();
      var instance_type_val = $("#add_containers_instance_type").val();
      var container_start_val = $("#add_containers_container_start").val();
      var container_end_val = $("#add_containers_container_end").val();

      if (!Number.isInteger(Number(container_start_val)) || !container_start_val || container_start_val < 1) {
        $("#container_start_error").css("display", "block");
        submit = false;
      }

      if (!Number.isInteger(Number(container_end_val)) || !container_end_val || container_end_val < 2) {
        $("#container_end_error").css("display", "block");
        submit = false;
      }

      if (!container_type_val) {
        $("#container_type_error").css("display", "block");
        submit = false;
      }

      if (!instance_type_val) {
        $("#instance_type_error").css("display", "block");
        submit = false;
      }

      if (container_end_val && 
        container_start_val && 
        Number.isInteger(Number(container_start_val)) && 
        Number.isInteger(Number(container_end_val))) {

        if (Number(container_start_val) >= Number(container_end_val)) {
          $("#container_range_order_error").css("display", "block");
          submit = false;
        } else if ((Number(container_end_val) - Number(container_start_val)) > 100) {
          $("#container_range_size_error").css("display", "block");
          submit = false;
        }
        
      }

      if (submit) {
        var url = AS.quickTemplate(decodeURIComponent($("#add-containers-dropdown").data("add-containers-url")), 
                  {container_type: container_type_val, 
                  instance_type: instance_type_val,
                  container_start: container_start_val,
                  container_end: container_end_val});

        location.href = url;
      }

    });
  };


  if ($('.add-containers-form').length > 0) {
    init();
  } else {
    $(document).bind("loadedrecordform.aspace", init);
  }

});