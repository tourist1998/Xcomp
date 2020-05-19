


var allocated = [];

const allocate = async function(jsonallocated) {
    try {

        const res = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/Allocate',
            data : {
                json_data : jsonallocated // to pass array of object we should convert it to string and then parse to get back original form 
            }
        });
        if(res.data.status === 'success')  {
            alert('This food has been allocated to you'); 
            window.setTimeout(()=> {
                location.assign('/PostNeed');
            },1500);
        }
    }
    catch(err) {
        // console.log(err.response.data);
        alert('Facing some error in allocating you this food');
        window.setTimeout(()=> {
            location.assign('/')
        },1500);
    }
}

document.querySelector('#submit').addEventListener('click', function(e)  {
    e.preventDefault();
    allocated.length = 0; // To make it empty
    var myTab = document.querySelector('#avail');
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        var id = objCells.item(0).innerHTML;
        var need = objCells.item(6).children[0].value;
        var total = objCells.item(2).innerHTML;
        if(need > 0) {
            allocated.push({
                'id' : id,
                'total_person_served' : need,
                'total' : total
            });
        }
    }
    console.log(allocated);
    // window.allocated = allocated; // This object has global scope now save this object to database.
    var jsonallocated = JSON.stringify(allocated);
    allocate(jsonallocated);
})


