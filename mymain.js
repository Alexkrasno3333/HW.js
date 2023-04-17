//hw 25
class UserService {
			static async getUsers() {
				try {
					const response = await fetch('https://dummyusersapi.herokuapp.com/api/users');
					const data = await response.json();
					console.log(data);
				} catch(error) {
					console.error(error);
				}
			}

			static async getUserById(id) {
				try {
					const response = await fetch(`https://dummyusersapi.herokuapp.com/api/users/${id}`);
					const data = await response.json();
					console.log(data);
				} catch(error) {
					console.error(error);
				}
			}

			static async createUser(user) {
				try {
					const response = await fetch('https://dummyusersapi.herokuapp.com/api/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});
					const data = await response.json();
					console.log(data);
				} catch(error) {
					console.error(error);
				}
			}

			static async updateUser(id, user) {
				try {
					const response = await fetch(`https://dummyusersapi.herokuapp.com/api/users/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});
					const data = await response.json();
					console.log(data);
				} catch(error) {
					console.error(error);
				}
			}

			static async deleteUser(id) {
				try {
					const response = await fetch(`https://dummyusersapi.herokuapp.com/api/users/${id}`, {
						method: 'DELETE'
					});
					const data = await response.json();
					console.log(data);
				} catch(error) {
					console.error(error);
				}
			}

			static async deleteUsers() {
				try {
					const ids = [1, 2, 3, 4];
					const randomId = Math.floor(Math.random() * (10000 - 5 + 1)) + 5;
					ids.push(randomId);
					const requests = ids.map(id => fetch(`https://dummyusersapi.herokuapp.com/api/users/${id}`, {
						method: 'DELETE'
					}));
					const responses = await Promise.allSettled(requests);
					console.log(responses);
				} catch(error) {
					console.error(error);
				}
			}
		}

		// Examples
		UserService.getUsers();
		UserService.getUserById(1);
		UserService.createUser({ name: 'John Doe', email: 'johndoe@example.com', password: 'password' });
		UserService.updateUser(1, { name: 'Jane Doe', email: 'janedoe@example.com', password: 'password' });
		UserService.deleteUser(1);
		UserService.deleteUsers();