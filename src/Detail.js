import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import DetailDraggableArea from './DetailDraggableArea';
import DetailForm from './DetailForm';
import DetailData from './DetailData';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.updateItemsGroups = this.updateItemsGroups.bind(this);
    }

    updateItemsGroups(reordered) {
        const { actions, editableDetail } = this.props;
        actions.updateItemsGroups(editableDetail, reordered);
    }

    render() {
        const {
            detail,
            currentMode,
            options,
            agroupOptions,
            editableColumn,
            editableDetail,
            actions
        } = this.props;
        const groupedItems = [];
        for (let i = 1; i <= 5; i++) {
            const group = editableDetail.items.filter(item => item.line === i);
            groupedItems.push(group);
        }

        return (
            <Row style={{ backgroundColor: '#8c5151' }}>
                <Col md={12}>
                    <Row>
                        {
                            (currentMode === 'detailEdition' &&
                                editableDetail.detailOrder === detail.detailOrder) ?
                                <DetailForm
                                    onSave={actions.saveEditableDetail}
                                    onUpdate={actions.updateEditableDetail}
                                    onCancel={actions.finishDetailEdition}
                                    agroupOptions={agroupOptions}
                                    detail={editableDetail} /> :
                                <DetailData
                                    agroupOptions={agroupOptions}
                                    detail={detail}
                                    onEdit={actions.startDetailEdition}
                                    onRemove={actions.removeDetail} />
                        }
                    </Row>
                    <Row>
                        <Col md={12}>
                            {
                                (currentMode === 'detailEdition' &&
                                    editableDetail.detailOrder === detail.detailOrder) ?
                                    groupedItems.map((group, index) => (
                                        <DetailDraggableArea
                                            key={index}
                                            currentMode={currentMode}
                                            onReorder={this.updateItemsGroups}
                                            items={group}
                                            options={options}
                                            editableDetail={editableDetail}
                                            editableColumn={editableColumn}
                                            actions={actions} />
                                    )) : null
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

Detail.propTypes = {
    detail: PropTypes.object,
    currentMode: PropTypes.string,
    options: PropTypes.array,
    agroupOptions: PropTypes.array,
    editableColumn: PropTypes.object,
    editableDetail: PropTypes.object,
    actions: PropTypes.object,
};

Detail.defaultProps = {
    detail: {},
    currentMode: 'none',
    options: [],
    agroupOptions: [],
    editableColumn: {},
    editableDetail: {
        items: [],
    },
    actions: {},
};

const mapStateToProps = ({ layoutDetail }) => (
    {
        options: layoutDetail.toJS().options,
        editableColumn: layoutDetail.toJS().editableColumn,
        editableDetail: layoutDetail.toJS().editableDetail,
        agroupOptions: layoutDetail.toJS().agroupOptions,
    }
);

export default connect(mapStateToProps)(Detail);
