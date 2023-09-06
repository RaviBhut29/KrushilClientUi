import React from "react";

const Review = () => {
  return (
    <div className="rev">
      <section id="testimonials">
        <div className="testimonial-box-container">
          {/*BOX-1------------*/}
          <div className="testimonial-box">
            {/*top-----------------------*/}
            <div className="box-top">
              {/*profile---*/}
              <div className="profile">
                {/*img--*/}
                <div className="profile-img">
                  <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                </div>
                {/*name-and-username*/}
                <div className="name-user">
                  <strong>Esther Howard</strong>
                  <span>United Kingdom 🏳️‍⚧️</span>
                </div>
              </div>
            </div>
            {/*Comments--------------------------------------*/}
            <div className="client-comment">
              <p>
                The seller was faster than I had expected and delivered a bunch
                of different options. From them choices I picked one and we
                refined it twice to get the perfect design for my studio. I
                recommend you make a feel board first before contacting logoflow
                and really nail down the concept on paper. Otherwise it's like
                walking in the dark and that's not good.
              </p>
            </div>
            {/* ------Rating--------- */}
            <div className="container row align-items-end p-0">
              <div className="col-2 px-0 Rating-Container-Class">
                <fieldset
                  className="rating"
                  style={{ display: "inline-table" }}
                >
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    defaultValue={5}
                  />
                  <label
                    className="full"
                    htmlFor="star5"
                    title="Awesome - 5 stars"
                  />
                  <input
                    type="radio"
                    id="star4half"
                    name="rating"
                    defaultValue="4 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star4half"
                    title="Pretty good - 4.5 stars"
                  />
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    defaultValue={4}
                  />
                  <label
                    className="full"
                    htmlFor="star4"
                    title="Pretty good - 4 stars"
                  />
                  <input
                    type="radio"
                    id="star3half"
                    name="rating"
                    defaultValue="3 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star3half"
                    title="Meh - 3.5 stars"
                  />
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    defaultValue={3}
                  />
                  <label
                    className="full"
                    htmlFor="star3"
                    title="Meh - 3 stars"
                  />
                  <input
                    type="radio"
                    id="star2half"
                    name="rating"
                    defaultValue="2 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star2half"
                    title="Kinda bad - 2.5 stars"
                  />
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    defaultValue={2}
                  />
                  <label
                    className="full"
                    htmlFor="star2"
                    title="Kinda bad - 2 stars"
                  />
                  <input
                    type="radio"
                    id="star1half"
                    name="rating"
                    defaultValue="1 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star1half"
                    title="Meh - 1.5 stars"
                  />
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    defaultValue={1}
                  />
                  <label
                    className="full"
                    htmlFor="star1"
                    title="Sucks big time - 1 star"
                  />
                  <input
                    type="radio"
                    id="starhalf"
                    name="rating"
                    defaultValue="half"
                  />
                  <label
                    className="half"
                    htmlFor="starhalf"
                    title="Sucks big time - 0.5 stars"
                  />
                </fieldset>
              </div>
              <div className="col-2 px-0 Rating-Container-Class">
                <p className="comnt_rating_p">4.6</p>
              </div>
              <div className="col-2 px-0 Rating-Container-Class">
                <p className="comnt_rating_p2">| 23th january, 2022</p>
              </div>
            </div>
            {/* ------Rating--------- */}
          </div>
          <hr width={700} />
          {/*BOX-2------------*/}
          <div className="testimonial-box">
            {/*top-----------------------*/}
            <div className="box-top">
              {/*profile---*/}
              <div className="profile">
                {/*img--*/}
                <div className="profile-img">
                  <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                </div>
                {/*name-and-username*/}
                <div className="name-user">
                  <strong>Esther Howard</strong>
                  <span>United Kingdom 🏳️‍⚧️</span>
                </div>
              </div>
            </div>
            {/*Comments--------------------------------------*/}
            <div className="client-comment">
              <p>
                The seller was faster than I had expected and delivered a bunch
                of different options. From them choices I picked one and we
                refined it twice to get the perfect design for my studio. I
                recommend you make a feel board first before contacting logoflow
                and really nail down the concept on paper. Otherwise it's like
                walking in the dark and that's not good.
              </p>
            </div>
            {/* ------Rating--------- */}
            <div className="container row align-items-end p-0">
              <div className="col-2 px-0 Rating-Container-Class">
                <fieldset
                  className="rating"
                  style={{ display: "inline-table" }}
                >
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    defaultValue={5}
                  />
                  <label
                    className="full"
                    htmlFor="star5"
                    title="Awesome - 5 stars"
                  />
                  <input
                    type="radio"
                    id="star4half"
                    name="rating"
                    defaultValue="4 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star4half"
                    title="Pretty good - 4.5 stars"
                  />
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    defaultValue={4}
                  />
                  <label
                    className="full"
                    htmlFor="star4"
                    title="Pretty good - 4 stars"
                  />
                  <input
                    type="radio"
                    id="star3half"
                    name="rating"
                    defaultValue="3 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star3half"
                    title="Meh - 3.5 stars"
                  />
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    defaultValue={3}
                  />
                  <label
                    className="full"
                    htmlFor="star3"
                    title="Meh - 3 stars"
                  />
                  <input
                    type="radio"
                    id="star2half"
                    name="rating"
                    defaultValue="2 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star2half"
                    title="Kinda bad - 2.5 stars"
                  />
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    defaultValue={2}
                  />
                  <label
                    className="full"
                    htmlFor="star2"
                    title="Kinda bad - 2 stars"
                  />
                  <input
                    type="radio"
                    id="star1half"
                    name="rating"
                    defaultValue="1 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star1half"
                    title="Meh - 1.5 stars"
                  />
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    defaultValue={1}
                  />
                  <label
                    className="full"
                    htmlFor="star1"
                    title="Sucks big time - 1 star"
                  />
                  <input
                    type="radio"
                    id="starhalf"
                    name="rating"
                    defaultValue="half"
                  />
                  <label
                    className="half"
                    htmlFor="starhalf"
                    title="Sucks big time - 0.5 stars"
                  />
                </fieldset>
              </div>
              <div className="col-2 px-0 Rating-Container-Class">
                <p className="comnt_rating_p">4.6</p>
              </div>
              <div className="col-2 px-0 Rating-Container-Class">
                <p className="comnt_rating_p2">| 23th january, 2022</p>
              </div>
            </div>
            {/* ------Rating--------- */}
            {/* ------Reply--------- */}
            <div className="reply my-2" style={{ display: "flex" }}>
              <div>
                <hr className="reply_hr" />
                <p className="reply_p">Reply</p>
                <hr className="reply_hr" />
              </div>
              <div className="px-2 my-3 cmnt-reply">
                <div className="box-top Reply">
                  {/*profile---*/}
                  <div className="profile">
                    {/*img--*/}
                    <div className="profile-img">
                      <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                    </div>
                    {/*name-and-username*/}
                    <div className="name-user">
                      <strong>Esther Howard</strong>
                      <span>United Kingdom 🏳️‍⚧️</span>
                    </div>
                  </div>
                </div>
                <div className="client-comment">
                  <p>
                    The seller was faster than I had expected and delivered a
                    bunch of different options. From them choices I picked one
                    and we refined it twice to get the perfect design for my
                    studio.
                  </p>
                </div>
              </div>
            </div>
            {/* ------Reply--------- */}
          </div>
          <hr width={700} />
          {/*BOX-3------------*/}
          <div className="testimonial-box">
            {/*top-----------------------*/}
            <div className="box-top">
              {/*profile---*/}
              <div className="profile">
                {/*img--*/}
                <div className="profile-img">
                  <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                </div>
                {/*name-and-username*/}
                <div className="name-user">
                  <strong>Esther Howard</strong>
                  <span>United Kingdom 🏳️‍⚧️</span>
                </div>
              </div>
            </div>
            {/*Comments--------------------------------------*/}
            <div className="client-comment">
              <p>
                The seller was faster than I had expected and delivered a bunch
                of different options. From them choices I picked one and we
                refined it twice to get the perfect design for my studio. I
                recommend you make a feel board first before contacting logoflow
                and really nail down the concept on paper. Otherwise it's like
                walking in the dark and that's not good.
              </p>
            </div>
            {/* ------Rating--------- */}
            <div className="container row align-items-end p-0">
              <div className="col-2 px-0 Rating-Container-Class">
                <fieldset
                  className="rating"
                  style={{ display: "inline-table" }}
                >
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    defaultValue={5}
                  />
                  <label
                    className="full"
                    htmlFor="star5"
                    title="Awesome - 5 stars"
                  />
                  <input
                    type="radio"
                    id="star4half"
                    name="rating"
                    defaultValue="4 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star4half"
                    title="Pretty good - 4.5 stars"
                  />
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    defaultValue={4}
                  />
                  <label
                    className="full"
                    htmlFor="star4"
                    title="Pretty good - 4 stars"
                  />
                  <input
                    type="radio"
                    id="star3half"
                    name="rating"
                    defaultValue="3 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star3half"
                    title="Meh - 3.5 stars"
                  />
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    defaultValue={3}
                  />
                  <label
                    className="full"
                    htmlFor="star3"
                    title="Meh - 3 stars"
                  />
                  <input
                    type="radio"
                    id="star2half"
                    name="rating"
                    defaultValue="2 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star2half"
                    title="Kinda bad - 2.5 stars"
                  />
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    defaultValue={2}
                  />
                  <label
                    className="full"
                    htmlFor="star2"
                    title="Kinda bad - 2 stars"
                  />
                  <input
                    type="radio"
                    id="star1half"
                    name="rating"
                    defaultValue="1 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star1half"
                    title="Meh - 1.5 stars"
                  />
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    defaultValue={1}
                  />
                  <label
                    className="full"
                    htmlFor="star1"
                    title="Sucks big time - 1 star"
                  />
                  <input
                    type="radio"
                    id="starhalf"
                    name="rating"
                    defaultValue="half"
                  />
                  <label
                    className="half"
                    htmlFor="starhalf"
                    title="Sucks big time - 0.5 stars"
                  />
                </fieldset>
              </div>
              <div className="col-2 px-0 Rating-Container-Class">
                <p className="comnt_rating_p">4.6</p>
              </div>
              <div className="col-2 px-0 Rating-Container-Class">
                <p className="comnt_rating_p2">| 23th january, 2022</p>
              </div>
            </div>
            {/* ------Rating--------- */}
          </div>
        </div>
      </section>

      <nav
        className="forweb"
        aria-label="Page navigation example"
        style={{ textAlign: "center" }}
      >
        <ul className="pagination justify-content-start">
          <li className="page-item">
            <a className="page-link" href="#">
              <span>&lt;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              6
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              7
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              20
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <span>&gt;</span>
            </a>
          </li>
        </ul>
      </nav>

      <nav className="forMobile" aria-label="Page navigation example">
        <div style={{ textAlign: "center" }}>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#">
                <span>&lt;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                <span>&gt;</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Review;
