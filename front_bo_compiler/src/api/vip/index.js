export const getAllVipSetting = () => axios.get('/VipSet');

export const getVipSetting = (id) => axios.get(`/VipSet/${id}`);

export const patchVipSetting = (id, form) => axios.patch(`/VipSet/${id}`, form);