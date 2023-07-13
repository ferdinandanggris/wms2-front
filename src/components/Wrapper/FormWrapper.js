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
  const { id, img, title, path, type, children, role, roles, allowAdd, allowUpdate } = props;

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
 const handleSave = (e) => {
    e.preventDefault();
    console.log('Data saved');
    setSaving(true);
    setSaving(false);
  };

  const handleSaveAndAddMore = (e) => {
    e.preventDefault();
    console.log('Data saved & add more');
  };

  const renderModule = () => {
    return (
      <div className="d-flex">
        <Link
          to={`${returnUrl}`}
          className="btn btn-back ml-2 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#808080',
            borderRadius: '4px',
            marginRight: '8px',
          }}
        >
          {id === undefined ? 'Back' : 'Back'}
        </Link>
        <button
          type="submit"
          className="btn btn-save ml-2 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#008000',
            borderRadius: '4px',
          }}
          onClick={handleSaveAndAddMore}
          disabled={saving}
        >
          <span>Save & Add More</span>
        </button>
        <button
          type="submit"
          className="btn btn-save ml-2 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#0000FF',
            borderRadius: '4px',
          }}
          onClick={handleSave}
          disabled={saving}
        >
          <span>Save</span>
        </button>
      </div>
    );
  };

  if ((type === "create" && !isCreate) || (type === "edit" && !isUpdate)) return <Navigate to="/access-control" />;

  return (
    <form method="post" onSubmit={(e) => handleSave(e)}>
      {title !== undefined }
      <div className="content">
        <Alert />
        {children()}
       {renderModule()}
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
