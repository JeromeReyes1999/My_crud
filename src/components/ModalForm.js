import {Modal, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaUserAlt,FaEnvelope,FaMobileAlt,FaCalendarAlt} from "react-icons/fa";
import React,{ useState, useEffect, useRef} from "react";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

const ModalForm = (props) => {
    // const simpleValidator = useRef(new SimpleReactValidator())
    // const inputName=useRef(null)
    // const inputContact=useRef(null)
    // const inputBday=useRef(null)
    // const inputEmail=useRef(null)
    // const inputAddress=useRef(null)

    const [selectedDay, setSelectedDay] = useState('');
    const initialFieldValues = {
        fullname:'',
        contact:'',
        email:'',
        birthdate:'',
        address:''
    }

    const [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e =>{
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    useEffect(()=>{
        if(props.currentId=='')
            setValues({
                ...initialFieldValues
            })
        else{
            setValues({
                ...props.contactObjects[props.currentId]
            })
            setSelectedDay(toDatePickerObj(props.contactObjects[props.currentId].birthdate))
        }
    },[props.currentId,props.contactObjects])

    useEffect(() => {
        
        setValues({
            ...values,
            birthdate: selectedDay.year+'/'+selectedDay.month+'/'+selectedDay.day
        })
    },[selectedDay])

    const toDatePickerObj=(str)=>{

        if(typeof str === 'string' && str !=='' && str !==null && str !== undefined){
  
            var date_array = str.split("/");
            var result = date_array.map(function (x) { 
                return parseInt(x, 10); 
            });
            var newObj = {}

            newObj['year']=result[0]
            newObj['month']=result[1]
            newObj['day']=result[2]
            return newObj
        }
        else
            return ''
    }

    const handleFormSubmit = e =>{
        e.preventDefault()
            props.addOrEdit(values)
    }

    return (
    
        <Modal
            className={props.submitSuccess?'toAnimatebody':''}
            {...props}
            centered
            >
            <div className={props.submitSuccess?'toAnimateout head':''}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"  style={{fontSize:'15px'}}>
                    {props.currentId==='' 
                        ? (<><span>Add Contact </span></>)
                        :(<><span>Edit Contact </span></>)}
                    </Modal.Title>
                </Modal.Header>
            </div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
            <Modal.Body>
                <div class={'check_mark '+(props.submitSuccess?'toAnimatein':'no-disp')}>
                    <div class="sa-icon sa-success animate" style={{marginTop:'50%',textAlign:'center', marginLeft:'-4px',}}>
                        <span class="sa-line sa-tip animateSuccessTip"></span>
                        <span class="sa-line sa-long animateSuccessLong"></span>
                        <div class="sa-placeholder"></div>
                        <div class="sa-fix"></div>
                    </div>
                    <div  align='center' style={{fontSize:'20px',cursor:'context-menu',  textAlign:'center', fontWeight:'bold'}}>Success</div>
                </div>
                <div className={props.submitSuccess?'toAnimateout':''}>
                    <label htmlFor="fullname">Fullname</label>
                    <div className="input-group">
                        <span className="input-group-text"><FaUserAlt/></span>
                        <input type="text" className="form-control" name="fullname" placeholder="Fullname"
                            {...({required:'true'})}
                            value={values.fullname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label htmlFor="contact">Mobile No.</label>
                    <div className="input-group">
                        <span className="input-group-text"><FaMobileAlt/></span>
                        <input type="text" className="form-control" name="contact" placeholder="09123456789"
                            {...({required:'true', pattern:"^[0][9][0-9]{9}$"})}                     
                            value={values.contact}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label htmlFor="email">Email Address</label>
                    <div className="input-group">
                        <span className="input-group-text"><FaEnvelope/></span>
                        <input type="email" className="form-control" name="email" placeholder="email@email.com"
                            {...({required:'true'})}
                            value={values.email}
                            onChange={handleInputChange}                        
                        />
                    </div>
                    <label htmlFor="birthdate">Birthdate</label>
                    <div className="input-group">
                        <span className="input-group-text"><FaCalendarAlt/></span>
                        <DatePicker
                            value={selectedDay!=='' && toDatePickerObj(values.birthdate)}
                            onChange={setSelectedDay}
                            inputPlaceholder="Select your birthdate"
                            inputName="birthdate"
                            inputClassName='form-control'
                        />
                    </div>
                    <label htmlFor="address">Address</label>
                    <div className="input-group">
                        <textarea className="form-control" name="address" placeholder="Address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer >
                <div style={{margin:'auto'}} className={props.submitSuccess?'toAnimateout foot':''}>
                    <Button onClick={function(){props.onHide()}} style={{marginRight:'150px'}} className="btn btn-danger">Close</Button>
                    <Button type="submit" className="btn btn-primary">{props.currentId==='' ? 'Add':'Update'}</Button>
                </div>
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalForm
