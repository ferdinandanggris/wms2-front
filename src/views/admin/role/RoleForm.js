import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaUserLock } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadModule } from "../../../actions/master";

const RoleForm = ({ user, data, loadData, addData, editData, master, loadModule }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Role";
  const img = <FaUserLock className="module-img" />;
  const path = "/admin/role";
  const url = "role";
  const role = "Admin - Role";

  const [formData, setFormData] = useState({
    id: 0,
    description: "",
    roleDetails: [],
  });

  const { description, roleDetails } = formData;

  useEffect(() => {
    loadModule();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadModule, loadData]);

  useEffect(() => {
    let description = "";
    let roleDetails = [];

    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        description = data !== undefined && data !== null && data.data !== undefined && data.data !== null ? data.data.description : "";
        roleDetails = data !== undefined && data !== null && data.data !== undefined && data.data !== null ? data.data.roleDetails : [];
      }
    }

    if (master.module !== undefined && master.module !== null) {
      let list = master.module.map((item) => {
        const role =
          roleDetails === undefined || roleDetails === null || roleDetails.length === 0
            ? null
            : roleDetails.find((obj) => {
                return obj.moduleID === item.id;
              });
        const isRead = role === undefined || role === null ? false : role.isRead;
        const isCreate = role === undefined || role === null ? false : role.isCreate;
        const isUpdate = role === undefined || role === null ? false : role.isUpdate;
        const isDelete = role === undefined || role === null ? false : role.isDelete;
        return { id: 0, moduleID: item.id, roleID: id === undefined ? 0 : parseInt(id), isRead, isCreate, isUpdate, isDelete };
      });
      setFormData({ id: id === undefined ? 0 : parseInt(id), description, roleDetails: list });
    }
  }, [id, data, master, setFormData]);

  const onChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheckChange = (e) => {
    let oldValues = roleDetails.map((obj) => {
      if (obj.moduleID !== parseInt(e.target.value)) return obj;

      switch (e.target.name) {
        case "read":
          return { ...obj, isRead: e.target.checked };
        case "create":
          return { ...obj, isCreate: e.target.checked };
        case "update":
          return { ...obj, isUpdate: e.target.checked };
        case "delete":
          return { ...obj, isDelete: e.target.checked };
        default:
          return obj;
      }
    });

    setFormData({ ...formData, roleDetails: oldValues });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (id === undefined) {
      console.log(formData);
      addData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    }
  };

  const renderModule = () => {
    return master.module.map((item, index) => {
      const role =
        roleDetails === undefined || roleDetails === null || roleDetails.length === 0
          ? null
          : roleDetails.find((obj) => {
              return obj.moduleID === item.id;
            });
      if (role === undefined || role === null) return null;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.description}</td>
          <td className="text-center">
            <input type="checkbox" id="read" name="read" checked={role.isRead} value={item.id} onChange={onCheckChange} />
          </td>
          <td className="text-center">
            <input type="checkbox" id="create" name="create" checked={role.isCreate} value={item.id} onChange={onCheckChange} />
          </td>
          <td className="text-center">
            <input type="checkbox" id="update" name="update" checked={role.isUpdate} value={item.id} onChange={onCheckChange} />
          </td>
          <td className="text-center">
            <input type="checkbox" id="delete" name="delete" checked={role.isDelete} value={item.id} onChange={onCheckChange} />
          </td>
        </tr>
      );
    });
  };

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle">Detail Information</div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Description</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="description" value={description} onChange={(e) => onChange(e)} placeholder="Enter Description" required />
          </div>
        </div>
        {master.module !== undefined && master.module !== null && (
          <div className="row">
            <div className="form-group col-sm-12">
              <label>Module</label>
              <Table className="table-list" striped responsive bordered hover>
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "7%" }}>
                      No
                    </th>
                    <th className="text-center" style={{ width: "65%" }}>
                      Module
                    </th>
                    <th className="text-center" style={{ width: "7%" }}>
                      Show
                    </th>
                    <th className="text-center" style={{ width: "7%" }}>
                      Create
                    </th>
                    <th className="text-center" style={{ width: "7%" }}>
                      Update
                    </th>
                    <th className="text-center" style={{ width: "7%" }}>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>{renderModule()}</tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

RoleForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadModule: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadModule })(RoleForm);
