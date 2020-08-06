import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';



const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { error:null};
            this.reqInteceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            });
            this.resInteceptor = axios.interceptors.response.use(res => res, error => {
                
                this.setState({error:error});
            });
        }
        componentWillUnmount(){
            //console.log('Will Unmount', this.reqInteceptor, this.resInteceptor);
            axios.interceptors.request.eject(this.reqInteceptor);
            axios.interceptors.request.eject(this.resInteceptor);

        }

        handleErrorConfirmed =()=>{
            this.setState({error:null});
        }

        render(){
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                        modalClosed={this.handleErrorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;