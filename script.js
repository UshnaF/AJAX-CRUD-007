
$(document).ready(function () {
    function displayRecords() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            success: function (data) {
                $("#records").empty();
                data.forEach(function (record) {
                    const recordElement = $(`
                        <li class="users" data-id="${record.id}">
                            ${record.id}
                            <input type="text" class="name" value="${record.name}">
                            <input type="text" class="username" value="${record.username}">
                            <input type="text" class="phone" value="${record.phone}">
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </li>`
                    );
                    $("#records").append(recordElement);
                });
            },
        });
    }

    displayRecords();

    $("#create").on("click", function () {
        var id = $("#id").val();
        var name = $("#name").val();
        var username = $("#user").val();
        var phone = $("#phone").val();

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "POST",
            data: { id: id, name: name, username: username, phone: phone },
            success: function () {
                $("#id").val("");
                $("#name").val("");
                $("#user").val("");
                $("#phone").val("");
                displayRecords();
                console.log("Created Record: ID=" + id + " Name=" + name + " Username=" + username + " Phone=" + phone);
            }
            ,
            error: function (error) {
                console.error("Error:", error);
            }
            
        });
       
    });
      
  
    $("#records").on("click", ".edit", function () {
      const recordElement = $(this).closest("li");
      const id = recordElement.data("id");
      const name = recordElement.find(".name").val();
      const username = recordElement.find(".username").val();
      const phone = recordElement.find(".phone").val();
    
      console.log("Edited Record: ID=" + id + " Name=" + name + " Username=" + username + " Phone=" + phone);
    });
  

    $("#records").on("click", ".delete", function () {
      const recordElement = $(this).closest("li");
      const id = recordElement.data("id");
      console.log("Deleted Record with ID=" + id);
      recordElement.remove();
    });
  });
  