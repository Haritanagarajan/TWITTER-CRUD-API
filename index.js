//LOAD TABLE

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/User");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += "<td>" + object["UserName"] + "</td>";
                trHTML += "<td>" + object["Age"] + "</td>";
                trHTML += "<td>" + object["Sex"] + "</td>";
                trHTML += "<td>" + object["ContactNo"] + "</td>";
                trHTML += "<td>" + object["EmailID"] + "</td>";
                trHTML +=
                    '<td><img width="50px" src="' +
                    object["UserImage"] +
                    '" class="avatar"></td>';
                trHTML +=
                    '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
                    object["id"] +
                    ')">Edit</button>';
                trHTML +=
                    '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
                    object["id"] +
                    ')">Del</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}

loadTable();

function showUserCreateBox() {
    //https://sweetalert2.github.io/v9.html
    Swal.fire({
        title: "Create user",
        html:
            '<input id="id"type="hidden">' +
            '<input id="UserName" class="swal2-input" placeholder="UserName">' +
            '<input id="Age" class="swal2-input" placeholder="Age">' +
            '<input id="Sex" class="swal2-input" placeholder="Sex">' +
            '<input id="ContactNo" class="swal2-input" placeholder="ContactNo">' +
            '<input id="EmailID" class="swal2-input" placeholder="EmailID">',
        preConfirm: () => {
            userCreate();
        },
    });
}

function userCreate() {
    // const id = document.getElementById("id").value;
    const UserName = document.getElementById("UserName").value;
    const Age = document.getElementById("Age").value;
    const Sex = document.getElementById("Sex").value;
    const ContactNo = document.getElementById("ContactNo").value;
    const EmailID = document.getElementById("EmailID").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/User/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            // id: id,
            UserName: UserName,
            Age: Age,
            Sex: Sex,
            ContactNo: ContactNo,
            EmailID: EmailID,
            UserImage: "https://www.melivecode.com/users/1.png",
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            loadTable();
        }
    };
}

function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/User/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            //const user = objects["objects"];
            console.log(objects);
            Swal.fire({
                title: "Edit User",
                html:
                    '<input id="id" class="swal2-input" type="hidden"  value="' +
                    objects[`${id}`] +
                    '">' +
                    '<input id="UserName" class="swal2-input" placeholder="UserName" value="' +
                    objects["UserName"] +
                    '">' +
                    '<input id="Age" class="swal2-input" placeholder="Age" value="' +
                    objects["Age"] +
                    '">' +
                    '<input id="Sex" class="swal2-input" placeholder="Sex" value="' +
                    objects["Sex"] +
                    '">' +
                    '<input id="ContactNo" class="swal2-input" placeholder="ContactNo" value="' +
                    objects["ContactNo"] +
                    '">' +
                    '<input id="EmailID" class="swal2-input" placeholder="EmailID" value="' +
                    objects["EmailID"] +
                    '">',
                preConfirm: () => {
                    userEdit(id);
                },
            });
        }
    };
}

function userEdit(id) {
    // const id=document.getElementById("id").value
    const UserName = document.getElementById("UserName").value;
    const Age = document.getElementById("Age").value;
    const Sex = document.getElementById("Sex").value;
    const ContactNo = document.getElementById("ContactNo").value;
    const EmailID = document.getElementById("EmailID").value;
    console.log(id);
    console.log(UserName);
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/User/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            //id:id
            UserName: UserName,
            Age: Age,
            Sex: Sex,
            ContactNo: ContactNo,
            EmailID: EmailID,
            UserImage: "https://www.melivecode.com/users/1.png",
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            loadTable();
        }
    };
}

function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open(`DELETE`, `http://localhost:3000/User/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            id: id,
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            // Swal.fire(objects["message"]);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    objects["message"];
                }
            })
        }
        loadTable();
    };
}