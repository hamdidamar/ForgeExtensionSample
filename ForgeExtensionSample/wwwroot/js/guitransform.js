function setupMyModel() {
    

    tree = viewer.model.getData().instanceTree;


    let ID_BaseRod = findNodeIdbyName('BaseRod');
    let ID_LowerArmBody = findNodeIdbyName("LowerArmBody");



    /* ====================== MainAxis ================= */
    let Pivot_BaseRod = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    let Position_BaseRod = getFragmentWorldMatrixByNodeId(ID_BaseRod).matrix[0].getPosition().clone();
    Pivot_BaseRod.position.x = Position_BaseRod.x;
    Pivot_BaseRod.position.y = Position_BaseRod.y;
    Pivot_BaseRod.position.z = Position_BaseRod.z;
    viewer.impl.scene.add(Pivot_BaseRod);

    let Helper_LowerArmBody = new THREE.Mesh();
    let Position_LowerArmBody = getFragmentWorldMatrixByNodeId(ID_LowerArmBody).matrix[0].getPosition().clone();
    Helper_LowerArmBody.position.x = - Position_LowerArmBody.x + Math.abs(Position_LowerArmBody.x - Pivot_BaseRod.position.x);
    Helper_LowerArmBody.position.y = - Position_LowerArmBody.y + Math.abs(Position_LowerArmBody.y - Pivot_BaseRod.position.y);
    Helper_LowerArmBody.position.z = - Position_LowerArmBody.z + Math.abs(Position_LowerArmBody.z - Pivot_BaseRod.position.z);
    Pivot_BaseRod.add(Helper_LowerArmBody);


    
    assignTransformations(Helper_LowerArmBody, ID_LowerArmBody);



    let gui = new dat.GUI({ autoPlace: false });
    document.getElementById("MyControls").append(gui.domElement);

    let third_ring_rotation = 0;
    let box_control = null;

    let MainAxis = null;

    let GiroController = function () {
        this.MainAxis = 0;
       
        this.reset = function () {

            third_ring_rotation = 0;
            MainAxis.setValue(0);

        }
    }


    box_control = new GiroController();
    MainAxis = gui.add(box_control, 'MainAxis', -180, 180);


    MainAxis.onChange(function (value) {
        Pivot_BaseRod.rotation.y = value * Math.PI / 180;
        assignTransformations(Helper_LowerArmBody, ID_LowerArmBody);

        viewer.impl.sceneUpdated(true);
    });

    

}