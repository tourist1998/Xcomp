












const postFoodNeed = async (pickuptime,type_of_food,location,total_person_served) => {
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/Need',
        data : {
            pickuptime,type_of_food,location,total_person_served
        }
    });
    if(res.data.Status === 'Success')  {
        alert('Submitte the Food Needed by you.');
        window.setTimeout(()=> {
            location.assign('/PostAvail')
        },1500);
    }
    console.log(res);
}


document.querySelector('#Food').addEventListener('submit',function(e) {
    e.preventDefault();
    const pickuptime = document.getElementById('apt').value;
    const type_of_food = document.getElementById('food').value;
    const location = document.getElementById('area').value;
    const total_person_served = document.getElementById('NumofPeople').value;
    postFoodNeed(pickuptime,type_of_food,location,total_person_served);
})