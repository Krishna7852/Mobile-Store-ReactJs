import React from "react";
import PropTypes from "prop-types";

const Title = ({ name, title }) => {
  return (
    <section className="row">
      <div className="col-10 mx-auto my-2 text-center text-title">
        <h1 className="text-capitalize font-weight-bold">
          {name} <strong className="text-blue">{title}</strong>
        </h1>
      </div>
    </section>
  );
};

Title.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Title;
