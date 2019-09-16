(async () => {
    async function getUsers() {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        return response.data;
    }

    function render(users) {
        const tableBody = document.getElementById('users-table-body');
        tableBody.innerHTML = users.reduce((html, user) =>
            html + `
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.website}</td>
            </tr>`, '');
    }

    let users = await getUsers();
    render(users);

    document.querySelector('thead tr')
        .addEventListener('click', e => {
            const tag = e.target;
            if (tag.classList.contains('t-header')) {
                const property = tag.getAttribute('data-prop');
                users = users.sort((a, b) => {
                    if (a[property] > b[property]) {
                        return 1;
                    } else if (a[property] < b[property]) {
                        return -1
                    }
                    return 0;
                });
                render(users);
                console.log(
                    tag.getAttribute('data-prop'),
                    tag.getAttribute('data-sort'))
            }
        })
})();
