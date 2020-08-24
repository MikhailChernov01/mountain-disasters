
//functions with checkbox
const checkboxFirstGroup = document.getElementById("chbxFirst");
const checkboxSecndGroup = document.getElementById("chbxSec");

function firstGrpDispaly() {
  
  if (checkboxFirstGroup.checked) {
    showMarkersFirstGroup();
  }
  if (!checkboxFirstGroup.checked) {
    clearMarkersFirstGroup();
  }
};

function secndGrpDispaly() {
  
  if (checkboxSecndGroup.checked) {
    showMarkersSecondGroup();
  }
  if (!checkboxSecndGroup.checked) {
    clearMarkersSecondGroup();
  }
};


