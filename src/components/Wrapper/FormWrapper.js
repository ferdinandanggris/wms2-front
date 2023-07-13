import React, { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { Link, Navigate, useSearchParams } from "react-router-dom";
// import ReactToPrint from "react-to-print";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Alert from "../Alert";

const FormWrapper = (props) => {
  // const pdf = useRef(null);

  const [searchParams] = useSearchParams();
  const { id, img, title, path, type, children, handleSave, role, roles, allowAdd, allowUpdate } = props;

  const [isCreate, setIsCreate] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [returnUrl, setReturnUrl] = useState(path);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
  }, []);

  useEffect(() => {
    if (role !== undefined && role !== null) {
      if (roles !== undefined && roles !== null) {
        const roleData = roles.find((obj) => obj.description === role);
        if (roleData !== undefined && roleData !== null) {
          setIsCreate(roleData.isCreate);
          setIsUpdate(roleData.isUpdate);
        }
      }
    }
  }, [role, roles]);

  const renderModule = () => {
    return (
      <div className="module d-flex justify-content-between">
        <div className="module-title d-flex align-items-center">
          {img}{" "}
          <span className="mr-2" style={{ marginTop: "4px" }}>
            {title}
          </span>{" "}
          <span style={{ fontWeight: "normal", marginTop: "4px" }}>{id === undefined ? "Create" : "View"}</span>
        </div>
        <div className="d-flex">
          {(allowAdd === undefined || allowAdd) &&
            isCreate &&
            id === undefined &&
            (saving ? (
              <div className="text-center">Saving...</div>
            ) : (
              <button type="submit" className="btn btn-save ml-2 d-flex align-items-center justify-content-center">
                <FaSave className="pt-0 mr-2" />
                <span>Save</span>
              </button>
            ))}
          {(allowUpdate === undefined || allowUpdate) &&
            isUpdate &&
            id !== undefined &&
            (saving ? (
              <div className="text-center">Saving...</div>
            ) : (
              <button type="submit" className="btn btn-save ml-2 d-flex align-items-center justify-content-center">
                <FaSave className="pt-0 mr-2" />
                <span>Update</span>
              </button>
            ))}
          {returnUrl !== undefined && returnUrl !== null && (
            <Link to={`${returnUrl}`} className="btn btn-back ml-2 d-flex align-items-center justify-content-center">
              <FaTimes className="pt-0 mr-2" />
              {id === undefined ? "Cancel" : "Back"}
            </Link>
          )}
        </div>
      </div>
    );
  };

  if ((type === "create" && !isCreate) || (type === "edit" && !isUpdate)) return <Navigate to="/access-control" />;

  return (
    <form method="post" onSubmit={(e) => handleSave(e)}>
      {title !== undefined && renderModule()}
      <div className="content">
        <Alert />
        {children()}
      </div>
    </form>
  );
};

FormWrapper.propTypes = {
  roles: PropTypes.array,
};

const mapStateToProps = (state) => ({
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(FormWrapper);
