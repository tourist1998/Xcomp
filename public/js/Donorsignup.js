




const signup = async (Name,UserName,Email,Password,PasswordConfirm,Address,Type,TypeofFood,AreaofService,Phone) => {
    
    try {
        const res = await axios({   
            method: 'POST',
            url: 'http://localhost:3000/api/v1/User/Signup',
            data: {
               Name,UserName,Email,Password,PasswordConfirm,Address,Type,TypeofFood,AreaofService,Phone
            }
        });
        console.log(res.data.Status);
        if(res.data.Status === 'Success')  {
            alert('Created account successfully');
            window.setTimeout(()=> {
                location.assign('/PostNeed')
            },1000);
        }
        console.log(res);
    } catch (err) {
      // console.log(err.response.data);
      alert('There is some error');
    }
};

document.getElementById('Donor').addEventListener('submit', function(e)  {
    e.preventDefault();
    const Name = document.getElementById('Donor Name').value;
    const UserName = document.getElementById('Username').value;
    const Email = document.getElementById('Email Id').value;
    const Phone = document.getElementById('Phone Number').value;
    const Password = document.getElementById('Password').value;
    const PasswordConfirm = document.getElementById('Confirm Password').value
    const Address = document.getElementById('Address').value;
    const Type = 'Donor'
    const TypeofFood = document.getElementById('food').value;
    const AreaofService = document.getElementById('area').value;
    signup(Name,UserName,Email,Password,PasswordConfirm,Address,Type,TypeofFood,AreaofService,Phone);
})
