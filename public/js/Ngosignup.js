






const signup = async (Name,UserName,Email,Password,PasswordConfirm,Address,Type,DirectorPhone,DirectorName,Phone) => {
    
    try {
        const res = await axios({   
            method: 'POST',
            url: 'http://localhost:3000/api/v1/User/Signup',
            data: {
               Name,UserName,Email,Password,PasswordConfirm,Address,Type,DirectorPhone,DirectorName,Phone
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

document.getElementById('NGO').addEventListener('submit', function(e)  {
    e.preventDefault();
    const Name = document.getElementById('Name').value;
    const UserName = document.getElementById('UserName').value;
    const Email = document.getElementById('Email Id').value;
    const Phone = document.getElementById('Phone').value;
    const Password = document.getElementById('Password').value;
    const PasswordConfirm = document.getElementById('PasswordConfirm').value
    const Address = document.getElementById('Address').value;
    const Type = 'NGO'
    const DirectorPhone = document.getElementById('DirectorPhone').value;
    const DirectorName = document.getElementById('DirectorName').value;
    signup(Name,UserName,Email,Password,PasswordConfirm,Address,Type,DirectorPhone,DirectorName,Phone);
})
