import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaUsers } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { setAlert } from "../../../actions/alert";
import { loadRole } from "../../../actions/master";
import Select2 from "../../../components/Select2";

const UserForm = ({ user, data, loadData, addData, editData, master, loadRole, setAlert }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "User";
  const img = <FaUsers className="module-img" />;
  const path = "/admin/user";
  const url = "user";
  const role = "Admin - User";

  const [formData, setFormData] = useState({
    id: 0,
    username: "",
    fullName: "",
    email: "",
    roleID: 0,
    password: "",
    confirm: "",
  });

  const { username, fullName, email, roleID, password, confirm } = formData;

  const [roleList, setRoleList] = useState(null);

  useEffect(() => {
    loadRole();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadRole, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          username: data.data.username,
          fullName: data.data.fullName,
          email: data.data.email,
          roleID: data.data.roleID,
          password: "",
          confirm: "",
        });
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.role !== undefined && master.role !== null) {
      let list = [...master.role];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Role",
          roleDetails: null,
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setRoleList(list);
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (password !== "") {
      if (password !== confirm) {
        setAlert("Invalid Password", "danger");
        return;
      }
    }

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    }
  };

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle">Detail Information</div>
        <div className="row">
          <div className="form-group col-sm-6">
            <label>Username</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="username" value={username} onChange={(e) => onChange(e)} placeholder="Enter Username" required />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Name</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="fullName" value={fullName} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Email</label>
            <span className="required-star">*</span>
            <input className="form-control" type="email" name="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter Email" required />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-6">
            <label>Role</label>
            <span className="required-star">*</span>
            <Select2 options={roleList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Role"} value={roleList === null ? null : roleList.filter((option) => option.id === parseInt(roleID))} handleChange={(e) => onSelectChange(e, "roleID")} />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group col-sm-6">
            <label>Password</label>
            <input className="form-control" type="password" name="password" value={password} onChange={(e) => onChange(e)} placeholder="Enter New Password" />
          </div>
          <div className="form-group col-sm-6">
            <label>Confirm</label>
            <input className="form-control" type="password" name="confirm" value={confirm} onChange={(e) => onChange(e)} placeholder="Enter Confirm Password" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadRole: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadRole, setAlert })(UserForm);
