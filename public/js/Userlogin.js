
const login = async function(UserName,Password) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/User/Login',
            data: {
                UserName,Password
            }
        })
        console.log(res);
        console.log(res.data.user.Type);
        if(res.data.Status === 'Success')  {
            alert('Logged In');
            window.setTimeout(()=> {
                if(res.data.user.Type === 'Donor')
                location.assign('/PostNeed')
                else 
                location.assign('/PostAvail')
            },1500);
        }
    }
    catch(err) {
        console.log(err.response.data);
        alert('There is some error');
    }
}


document.querySelector('#login').addEventListener('submit',function(e) {
    e.preventDefault();
    const UserName = document.getElementById('UserName').value;
    const Password = document.getElementById('Password').value;
    login(UserName,Password);
})