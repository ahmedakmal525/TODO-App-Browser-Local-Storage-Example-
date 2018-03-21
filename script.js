$().ready(()=>{
    $('#saveButton').click(()=>{
        let name=$('#inputName').val()
        let title=$('#inputTitle').val()
        let date=$('#exampleInputDate').val()
        let note=$('#exampleInputContent').val()
        let id = randNumGen();
        let jsonObj = {'_id':id,'title':title,'date':date,'note':note}
        localStorage.getItem(name)===null?setDefaultUserTODO(name,jsonObj):setUserTODO(name,jsonObj)
        displayUserTODO(name)
    });

    $('#usernameInput').keypress(e=>{
        if(e.which===13){
            var bla = $('#usernameInput').val()
            displayUserTODO(bla)
        }
    });
});

const setDefaultUserTODO=(name,jsonObj)=>{
    var userArr=[]
    userArr.push(jsonObj)
    localStorage.setItem(name,JSON.stringify(userArr))
}

const setUserTODO=(name,jsonObj)=>{
    var storedVar = localStorage.getItem(name)
    var newArr = $.parseJSON(storedVar)
    newArr.push(jsonObj)
    localStorage.setItem(name, JSON.stringify(newArr))
}


const randNumGen=()=>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const displayUserTODO=(name)=>{
    $(".table > tbody").html("");
    var storedJSONData = $.parseJSON(localStorage.getItem(name))
    $.each(storedJSONData,(index,item)=>{
        var $tr = $('<tr>').append(
            $('<td>').text(item._id),
            $('<td>').text(item.title),
            $('<td>').text(item.date),
            $('<td>').text(item.note),
            $('<td>').html("<button class=\"btn btn-warning warning-btn\" onclick=\"return editEntry('"+item._id+"','"+name+"');\" data-toggle=\"modal\" data-target=\"#exampleModal\">Edit</button>"),
            $('<td>').html("<button class=\"btn btn-danger danger-btn\" onclick=\"return deleteEntry('"+item._id+"','"+name+"');\">Delete</button>")
        ).appendTo('.table');
    })
}

const editEntry=(id, name)=>{
    var storedJSONData = $.parseJSON(localStorage.getItem(name))
    storedJSONData.find((item,index)=>{
        if(item._id===id){
            $('.save-button').click(()=>{
                let title = $('#editTitle').val()
                let date = $('#editDate').val()
                let content = $('#editContent').val()
                storedJSONData.splice(index, 1, {'_id':id,'title':title,'date':date,'note':content})
                localStorage.setItem(name, JSON.stringify(storedJSONData))
                displayUserTODO(name)
                $('#exampleModal').modal('toggle');
            })
        }
    })
}

const deleteEntry=(id, name)=>{
    var storedJSONData = $.parseJSON(localStorage.getItem(name))
    storedJSONData.find((item,index)=>{
        if(item._id===id){
            storedJSONData.splice(index,1)
            localStorage.setItem(name, JSON.stringify(storedJSONData))
            displayUserTODO(name)
        }
    })
}

const getUserData=(id, name)=>{
    var a = null
    var storedJSONData = $.parseJSON(localStorage.getItem(name))
    $.each(storedJSONData,(index, item)=>{
        if(item._id===id){
            a = item
        }
    })
    return a
}