module.exports = (query) => {
    let filterStatus = [
      {
        name: "Tất cả",
        status: "",
        class: ""
      },
      {
        name: "Hoạt động",
        status: "active",
        class: ""
      },
      {
        name: "Dừng hoạt động",
        status: "inactive",
        class: ""
      }
    ];
  
    // Logic kiểm tra để gán class "active"
    if (query.status) {
      // Nếu có status trên URL, tìm nút tương ứng và gán class active
      const index = filterStatus.findIndex(item => item.status == query.status);
      filterStatus[index].class = "active";
    } else {
      // Nếu không có status trên URL (mặc định), gán class active cho nút "Tất cả"
      const index = filterStatus.findIndex(item => item.status == "");
      filterStatus[index].class = "active";
    }
  
    return filterStatus; 
  }