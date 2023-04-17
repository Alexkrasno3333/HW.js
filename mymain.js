//hw 25
class UserService {
  static #baseUrl = "https://dummyjson.com/users";
  static getAllUsers = () => {
    fetch(this.#baseUrl)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  static getUser = (id) => {
    fetch(`${this.#baseUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  static searchUsers = (query) => {
    fetch(`${this.#baseUrl}/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  static filterUsers = async (key, value) => {
    try {
      const url = new URL(`${this.#baseUrl}/filter`);
      url.searchParams.set("key", key);
      url.searchParams.set("value", value);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static paginateUsers = async (limit, skip) => {
    try {
      const url = new URL(this.#baseUrl);
      url.searchParams.set("limit", limit);
      url.searchParams.set("skip", skip);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static getUserCart = async (id) => {
    try {
      const res = await fetch(`${this.#baseUrl}/${id}/carts`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static getUserPosts = async (id) => {
    try {
      const res = await fetch(`${this.#baseUrl}/${id}/posts`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static getUserTodos = async (id) => {
    try {
      const res = await fetch(`${this.#baseUrl}/${id}/todos`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static addUser = async (body) => {
    try {
      const res = await fetch(`${this.#baseUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static updateUser = async (id, body) => {
    try {
      const res = await fetch(`${this.#baseUrl}/${id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  static deleteUser = async (id) => {
    try {
      const res = await fetch(`${this.#baseUrl}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}

