import axios from "axios";
import { toast } from "react-toastify";

export function apiPost(resource, obj) {
  const promise = new Promise((resolve, reject) => {
    
    axios({
      method: "post",
      url: `${resource}`,
      data: obj,
      config: {
        headers: {
          Accept: "application/json",
        },
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error creating " + resource, obj, err);
        reject(err);
      });
  });
  return promise;
}

export function apiFormDataPost(resource, obj) {
  const promise = new Promise((resolve, reject) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(resource, obj, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error creating " + resource, obj, err);
        reject(err);
      });
  });
  return promise;
}

export function apiFormMultipleFilePost(resource, obj, multipleFileName) {
  const promise = new Promise((resolve, reject) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const formData = new FormData();

    for (var key in obj) {
      if (key === multipleFileName) {
        for (var i = 0; i < obj[key].length; i++) {
          formData.append(key, obj[key][i]);
        }
      } else {
        formData.append(key, obj[key]);
      }
    }

    axios
      .post(resource, formData, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error creating " + resource, obj, err);
        reject(err);
      });
  });
  return promise;
}

export function apiFormMultipleFilePut(resource, obj, multipleFileName) {
  const promise = new Promise((resolve, reject) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formData = new FormData();

    for (var key in obj) {
      if (key === multipleFileName) {
        for (var i = 0; i < obj[key].length; i++) {
          formData.append(key, obj[key][i]);
        }
      } else {
        formData.append(key, obj[key]);
      }
    }

    axios
      .put(resource, formData, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error updating " + resource, obj, err);
        reject(err);
      });
  });
  return promise;
}

export function apiPut(resource, obj = null) {
  const promise = new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `${resource}`,
      data: obj,
      config: {
        headers: {
          Accept: "application/json",
        },
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error updating " + resource, obj, err);
        reject(err);
      });
  });
  return promise;
}

export function apiFormDataPut(resource, obj) {
  const promise = new Promise((resolve, reject) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .put(resource, obj, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error updating " + resource, obj, err);
        reject(err);
      });
  });
  return promise;
}

export function apiDelete(resource) {
  const promise = new Promise((resolve, reject) => {
    axios
      .delete(`${resource}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error deleting " + resource, err);
        reject(err);
      });
  });
  return promise;
}

export function apiGet(resource) {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(resource)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Encountered error fetching " + resource, err);
        reject(err);
      });
  });
  return promise;
}

export const toastSuccess = (text) => {
  toast.success(text, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const toastWarning = (text) => {
  toast.warn(text, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const toastDark = (text) => {
  toast.dark(text, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const toastError = (text) => {
  toast.error(text, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
