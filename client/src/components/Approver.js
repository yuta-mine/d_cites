import React, { Component } from 'react';

class Approver extends Component {
  state = {
    approvers: ['']
  };

  addApprover() {
    this.setState({ approvers: [...this.state.approvers, ''] });
    console.log(this.state.approvers);
  }

  handleCahnge(e, index) {
    this.state.approvers[index] = e.target.value;
    this.setState({ approvers: this.state.approvers });
  }

  handleRemove(index) {
    this.state.approvers.splice(index, 1);
    // console.log(this.state.approvers);
    this.setState({ approvers: this.state.approvers });
  }
  handleSubmit(e) {
    console.log(this.state.approvers);
  }

  render() {
    return (
      <div>
        <h1>承認者登録</h1>
        <label>承認者</label>
        {/* <form> */}
        {this.state.approvers.map((approver, index) => {
          return (
            <div key={index}>
              <input
                onChange={e => this.handleCahnge(e, index)}
                value={approver}
                placeholder="承認者アドレス"
              />
              <button onClick={e => this.handleRemove(index)}>削除</button>
            </div>
          );
        })}
        <button onClick={e => this.addApprover(e)}>追加</button>
        <button onClick={e => this.handleSubmit(e)}>承認者登録</button>
        {/* </form> */}
      </div>
    );
  }
}

export default Approver;
