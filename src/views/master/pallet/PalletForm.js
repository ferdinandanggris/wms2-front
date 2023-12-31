import { useEffect, useState } from "react";

import { FaLayerGroup, FaPallet } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { loadData, addData, editData } from "../../../actions/data";

import ListTransaction from "../customComponent/listTransaction";

const PalletForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const title = "Pallet";
    const img = <FaPallet className="module-img" />;
    const path = "/master/pallet";
    const url = "Pallet";
    const role = "Master - Pallet";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        name: "",
        type: "",
        capacity: 0,
        tare: 0,
    });

    const { code, name, type, capacity, tare } = formData;

    useEffect(() => {
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    code: data.data.code,
                    name: data.data.name,
                    type: data.data.type,
                    capacity: data.data.capacity,
                    tare: data.data.tare,
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

    console.log("TYPE", type)

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle">
                    <FaPallet style={tabIconStyle} />Detail Information
                </div>

                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Code <span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
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
                            Name<span className="required-star">*</span>
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

                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Type <span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <select
                                className="form-control"
                                name="type"
                                onChange={(e) => onChange(e)}
                                value={type}
                                required
                            >
                                <option value="">** Please Select</option>
                                <option value="Glass">Glass</option>
                                <option value="Plastic">Plastic</option>
                            </select>
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
                                className="form-control text-right"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Tare
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="tare"
                                value={tare}
                                type="number"
                                className="form-control text-right"
                                onChange={(e) => onChange(e)}
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <ListTransaction id={id} listType="pallet" formData={formData} />
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

PalletForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(PalletForm);