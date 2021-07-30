import React, {useEffect,useState} from 'react'
import { FaTrashAlt,FaPencilAlt,FaPlusCircle,FaSearch,FaEye} from 'react-icons/fa'
import ModalForm from './ModalForm'
import firebaseDb from '../firebase'
import {Button,Table,Card} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";

const Contacts = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [searchInput, setSearchInput] =useState('')
    const [modalShow, setModalShow] = React.useState(false);
    const [contactObjects, setContactObjects]=useState({})
    const [currentId, setCurrentId]= useState('')
    const [resultsValue, setResultsValue]= useState(Object.keys(contactObjects))

    const [currentPage, setCurrentPage] = useState(1);
    
    // total records per page to display
    const [recordPerPage, setRecordPerPage] = useState(6);
   
    // total number of the records
    const [totalRecords,setTotalRecords] = useState(Object.keys(contactObjects).length);
    // range of pages in paginator
    const pageRange = 4;
   
    // handle change event
    const handlePageChange = pageNumber => {
      setCurrentPage(pageNumber);
    }
    

    useEffect(()=>{
        setResultsValue(Object.keys(contactObjects))
    },[contactObjects])

    useEffect(()=>{
        firebaseDb.child('contacts').on('value',snapshot=>{
            if(snapshot.val!=null)
                setContactObjects({
                    ...snapshot.val()
                })
            else
                setContactObjects({})
        })
    },[])


    const addOrEdit = obj=>{
        if(currentId=='')
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if(err)
                        console.log(err)
                    else{
                        setSubmitSuccess(true)

                        new Promise(function(resolve, reject) {

                            setTimeout(() =>{
                                setModalShow(false)
                                resolve(1)
                            }, 800);
                          }).then(function(result) { 
                                setTimeout(() =>{
                                    setSubmitSuccess(false)
                                    setCurrentId('')
                                }, 120);
                          })
                    }
                          
                }
            )
        else
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err)
                        console.log(err)
                    else{
                        setSubmitSuccess(true)

                        new Promise(function(resolve, reject) {

                            setTimeout(() =>{
                                setModalShow(false)
                                resolve(1)
                            }, 800);
                          }).then(function(result) { 
                                setTimeout(() =>{
                                    setSubmitSuccess(false)
                                    setCurrentId('')
                                }, 120);
                          })
                    }
                }
            )
    }
    useEffect(() => {
        var newSearchInput = searchInput.toUpperCase()
        var newInput=  Object.keys(contactObjects).filter(id=>{
            return contactObjects[id].fullname.toUpperCase().includes(newSearchInput) ||
            contactObjects[id].contact.toUpperCase().includes(newSearchInput) || 
            contactObjects[id].email.toUpperCase().includes(newSearchInput) || 
            contactObjects[id].birthdate.toUpperCase().includes(newSearchInput) || 
            contactObjects[id].address.toUpperCase().includes(newSearchInput)
        })
        setResultsValue(newInput.slice((currentPage*recordPerPage)-recordPerPage,(currentPage*recordPerPage)))
        setTotalRecords(newInput.length)
    }, [searchInput,contactObjects,currentPage,recordPerPage]);

    const handleSearch=e=>{
        setSearchInput(e.target.value)
        setCurrentPage(1)
    }
    const handleRecordPerPage=e=>{
        setRecordPerPage(e.target.value)
    }
      const onDelete=key=>{
          if(window.confirm('Are you sure to delete this record?')){
              firebaseDb.child(`contacts/${key}`).remove(
                  err=>{
                        if(err)
                            console.log(err)
                        else
                            setCurrentId('')
                  }
              )
          }
      }
    

    return (
        <div>
        <div style={{position:'relative',top:'-9em'}}>
            <div style={{columnCount: '1',columnGap: '20px', marginLeft:'10%',marginRight:'10%'}}>
                <div style={{ display:'inline-block',color: 'white'}}>
                    <h1 style={{ display:'inline-block',color: 'white'}}>Contacts</h1><br/>
                    <h10 style={{ display:'inline-block',color: 'white'}}>My Crud / Contacts</h10>
                </div>
                <Button  className='btn-add' style={{ marginTop:'22px'}}
                    onClick={function(){setCurrentId('');setModalShow(true); }}
                ><FaPlusCircle/> Add new</Button>
            </div>
        <Card style={{width:'80%', height:'70%', margin:'auto', marginTop:'2%'}}>
            <Card.Body style={{boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'}}>
                <div style={{marginLeft:'1.5%', marginRight:'1.5%'}}>
                    <div style={{display:'inline-block'}}><div style={{display:'inline-block',fontWeight:'bold'}}>Total Entries: </div> {Object.keys(contactObjects).length}</div>
                    <div className="input-group"  style={{width:'35%',float:'right'}} >
                        <span className="input-group-text"><FaSearch/></span>
                        <input placeholder='search' onChange={handleSearch} className='form-control'/>
                    </div>
                </div>
                </Card.Body>
        </Card>
        <Card style={{width:'80%', height:'70%', margin:'auto', marginTop:'2%'}}>
                <Card.Body >

                <div className='horizontal-scroll'>
                <div className='pagination-bar'style={{float:'right',display:'inline-block', marginRight: '1.5%'}}>
                    <div className="input-group " style={{float:'left', width:'180px', marginRight: '20px'}} >
                        <label className='col-form-label' style={{float:'left', marginRight:'10px'}} for="search">Results/page:</label>
                         <input className='form-control' name='search' style={{borderRadius: '4px 4px 4px 4px',float:'left', marginTop: '4px', height:'30px'}}
                            value={recordPerPage}
                            onChange={handleRecordPerPage}
                         />
                    </div>
                    <Pagination
                        itemClass="page-item" // add it for bootstrap 4
                        linkClass="page-link" // add it for bootstrap 4
                        activePage={currentPage}
                        itemsCountPerPage={recordPerPage}
                        totalItemsCount={totalRecords}
                        pageRangeDisplayed={pageRange}
                        onChange={handlePageChange}
                        />
                    
                </div>
                <Table striped bordered hover style={{width:'97%', height:'70%',marginTop:'10px', margin:'auto'}}>
                    <thead >
                        <tr>
                            <th >Fullname</th>
                            <th>Mobile no.</th>
                            <th>Email address</th>
                            <th>Birthdate</th>
                            <th>Address</th>
                            <th style={{width:'18%'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resultsValue.length === 0 
                            ? <tr><td colSpan='7' className='text-center'>No contact to show</td></tr> 
                            : resultsValue.map( id=>{
                            if(contactObjects[id] !== undefined){
                            return <tr>
                                    <td>{contactObjects[id].fullname}</td>
                                    <td>{contactObjects[id].contact}</td>
                                    <td>{contactObjects[id].email}</td>
                                    <td>{contactObjects[id].birthdate}</td>
                                    <td>{contactObjects[id].address}</td>
                                    <td align="center">
                                        <div>
                                            <Button className='btn-warning btn-action' style={{color:'white',fontSize:'13px',marginRight:'10px'}}
                                                onClick={function(){setCurrentId(id); setModalShow(true);}}
                                            >
                                                <div style={{display:'inline-block', float:'left',marginTop:'-8px'}}><FaPencilAlt /> </div> 
                                                <div style={{display:'inline-block', float:'right',fontSize:'11px',marginTop:'-6px'}}> Edit</div>
                                            </Button>
                                            <Button className='btn-danger btn-action' style={{color:'white',fontSize:'13px'}}
                                                onClick={()=>{onDelete(id)}}
                                            >
                                                <div style={{display:'inline-block', float:'left',marginTop:'-8px'}}><FaTrashAlt /></div> 
                                                <div style={{display:'inline-block', float:'right',fontSize:'11px',marginTop:'-6px'}}> Del</div>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            }
                        })
                        }
                    </tbody>
                </Table>
                </div>
            </Card.Body>
        </Card>
        <ModalForm
            show={modalShow} onHide={() => setModalShow(false) } {...({addOrEdit,currentId,contactObjects,submitSuccess})}
        />
        </div>
        </div>

    )
}

export default Contacts
