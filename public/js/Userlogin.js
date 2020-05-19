


const login = async function(UserName,Password) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/User/Login',
            data: {
                UserName,Password
            }
        })
        // console.log(res);
        // console.log(res.data.user.Type);
        if(res.data.Status === 'Success')  {
            alert('Logged In');
            window.setTimeout(()=> {
                if(res.data.user.Type === 'Donor')
                location.assign('/PostAvail')
                else 
                location.assign('/PostNeed')
            },1500);
        }
    }
    catch(err) {
        console.log(err.response.data);
        alert('There is some error');
        window.setTimeout(()=> {
            location.assign('/login')
        },1500);
    }
}


document.querySelector('#login').addEventListener('submit',function(e) {
    e.preventDefault();
    const UserName = document.getElementById('UserName').value;
    const Password = document.getElementById('Password').value;
    login(UserName,Password);
})