





const logout = async function() {
    try {
        const res = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/v1/User/Logout'
        })
        if(res.data.Status === 'Success')  {
            alert('Logged Out Successfully'); 
            window.setTimeout(()=> {
                location.assign('/');
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
document.querySelector('#logout').addEventListener('click',function(e) {
    e.preventDefault();
    logout();
})
