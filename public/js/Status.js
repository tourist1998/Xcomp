


var allocated = [];

const allocate = async function(jsonallocated) {
    try {

        const res = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/status',
            data : {
                json_data : jsonallocated 
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
            // location.assign('/')
        },1500);
    }
}


document.querySelector('#submit').addEventListener('click', function(e)  {
    e.preventDefault();
    allocated.length = 0; // To make it empty
    var myTab = document.querySelector('#status');
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells; 
        var id = objCells.item(0).innerHTML;
        var addback = objCells.item(4).innerHTML; 
        // value of checkbox is always on 
        if(objCells.item(5).children[0].checked == true)  {
            allocated.push({
                'id' : id,
                'addback' : addback
            });
            console.log(allocated);
        } 
        
    }
    var jsonallocated = JSON.stringify(allocated);
    allocate(jsonallocated);
})
