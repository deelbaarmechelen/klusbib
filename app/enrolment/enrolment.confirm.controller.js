EnrolmentConfirmController.$inject = ['Flash', '$location', 'UserService', 'PaymentService','$state', '$stateParams'];

export default function EnrolmentConfirmController(Flash, $location, UserService, PaymentService, $state, $stateParams) {
    var vm = this;

    vm.profileLinkEnabled = true;
    vm.paymentLinkEnabled = false;
    vm.confirmLinkEnabled = false;
    vm.paymentStatus = 'UNKNOWN';
    vm.paymentMode = $state.current.data.payment_mode;
    vm.orderId = $stateParams.orderId;

     PaymentService.GetByOrderId(vm.orderId).then(function(response) {
        console.log(response);
        if (response.success) {
            vm.paymentStatus = response.message.state;
            vm.paymentMode = response.message.mode;
            return;
        } else {
            vm.paymentStatus = 'FAILED';
            return;
        }
     });
     vm.enrolmentSucceeded = function () {
         if (vm.paymentStatus === 'SUCCESS'
            ||vm.paymentStatus === 'OPEN') {
             return true;
         }
         return false;
     }
    vm.enrolmentFailed = function () {
        if (vm.paymentStatus !== 'UNKNOWN'
            && !vm.enrolmentSucceeded()) {
            return true;
        }
        return false;
    }

};

