import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaSearchLocation } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import ListTransaction from "../customComponent/listTransaction";

const LocationForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const title = "Add Location";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/master/location/:id?/:location";
    const url = "Location";
    const role = "Master - Location";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        name: "",
        remark: "",
        capacity: 0,
        warehouseId: "",
        group: "",
    });

    const { name, type, code, remark, capacity, warehouseId, group } = formData;

    useEffect(() => {
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    name: data.data.name,
                    category: data.data.category,
                    code: data.data.code,
                    uomId: data.data.uomId,
                    packingId: data.data.packingId,
                    initial: data.data.initial,
                    incoming: data.data.incoming,
                    outgoing: data.data.outgoing,
                    balance: data.data.balance,
                    exclusive: data.data.exclusive,
                    category: data.data.category,
                    type: data.data.type,
                    qtyPerPacking: data.data.qtyPerPacking,
                    isActive: data.data.isActive,
                });
            }
        }
    }, [id, data, setFormData]);

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();

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

    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle">
                    <FaSearchLocation style={tabIconStyle} />Add Locations
                </div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Code</label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Name<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="name"
                                value={name}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Remark<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="remark"
                                value={remark}
                                type="text"
                                className="form-control text-left"
                                onChange={(e) => onChange(e)}
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Capacity</label>
                        <div className="col-sm-4">
                            <input
                                name="capacity"
                                value={capacity}
                                type="number"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Warehouse<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                            <select
                                className="form-control"
                                name="warehouseId"
                                value={warehouseId}
                                onChange={(e) => onChange(e)}
                                required
                            >
                                <option value="">Select Warehouse</option>
                                <option value="warehouse1">Warehouse 1</option>
                                <option value="warehouse2">Warehouse 2</option>
                                <option value="warehouse3">Warehouse 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Group<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                            <select
                                className="form-control"
                                name="group"
                                value={group}
                                onChange={(e) => onChange(e)}
                                required
                            >
                                <option value="">Select Group</option>
                                <option value="group1">Group 1</option>
                                <option value="group2">Group 2</option>
                                <option value="group3">Group 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <ListTransaction id={id} listType="location" formData={formData} />
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

LocationForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
});

export default connect(mapStateToProps, { loadData, addData, editData })(LocationForm);