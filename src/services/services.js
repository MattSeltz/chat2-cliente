export const login = async (body) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    return [res.ok, data];
  } catch (error) {
    console.error(error.message);
    return [false, error.message];
  }
};

export const register = async (body) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    return [res.ok, data];
  } catch (error) {
    console.error(error.message);
    return [false, error.message];
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return [res.ok, data];
  } catch (error) {
    console.error(error.message);
    return [false, error.message];
  }
};
