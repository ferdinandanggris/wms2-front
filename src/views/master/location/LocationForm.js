import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaSearchLocation } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import ListTransaction from "../customComponent/listTransaction";
import Select2 from "../../../components/Select2";

import { loadWarehouse, loadGroup } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";

const LocationForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadGroup }) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const title = "Location";
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
        warehouse: "",
        group: "",
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [groupList, setGroup] = useState([]);
    const { name, type, code, remark, capacity, warehouseId, groupId } = formData;

    useEffect(() => {
        loadWarehouse();
        loadGroup();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadGroup]);

    useEffect(() => {
        if (master.warehouse !== undefined && master.warehouse !== null) {
            let list = [...master.warehouse];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Warehouse",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setWarehouse(list);
        }
        if (master.group !== undefined && master.group !== null) {
            let list = [...master.group];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Group",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setGroup(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    name: data.data.name,
                    code: data.data.code,
                    capacity: data.data.capacity,
                    remark: data.data.remark,
                    warehouseId: data.data.warehouseId,
                    groupId: data.data.groupId,
                });
            }
        }
    }, [id, data, setFormData]);

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e, name) => {
        setFormData({ ...formData, [name]: e.id });
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
                    <FaSearchLocation style={tabIconStyle} />Detail Information
                </div>

                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2 ">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Code</label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder="Enter Code"
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
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Remark<span className="required-star">*</span>
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
                                className="form-control text-right"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Warehouse<span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Group<span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={groupList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Group"}
                                value={groupList === null ? null : groupList.filter((option) => option.id === parseInt(groupId))}
                                handleChange={(e) => onSelectChange(e, "groupId")} />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
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
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadGroup })(LocationForm);