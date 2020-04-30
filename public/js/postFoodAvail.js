


const postFoodNeed = async (pickuptime,type_of_food,location,total_person_served) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/Availability',
            data : {
                pickuptime,type_of_food,location,total_person_served
            }
        })
        if(res.data.Status === 'Success')  {
            alert('Submitte the Food Available to you.');
        }
    // console.log(res);
    }
    catch(err) {
        console.log('There is some error in posting food');
        alert('There is some error');
        window.setTimeout(()=> {
            location.assign('/login')
        },1500);
    }
}

document.querySelector('#Avail').addEventListener('submit',function(e) {
    e.preventDefault();
    const pickuptime = document.getElementById('apt').value;
    const type_of_food = document.getElementById('food').value;
    const location = document.getElementById('area').value;
    const total_person_served = document.getElementById('NumofPeople').value;
    postFoodNeed(pickuptime,type_of_food,location,total_person_served);
})