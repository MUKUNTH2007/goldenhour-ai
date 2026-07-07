from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.accident import Accident
from app.models.prediction import Prediction
from app.models.alert import Alert
from app.models.hospital import Hospital


class AnalyticsService:

    @staticmethod
    def get_summary(db: Session):

        # Total accidents
        total_accidents = db.query(func.count(Accident.id)).scalar()

        # Total alerts
        total_alerts = db.query(func.count(Alert.id)).scalar()

        # Total hospitals used
        total_hospitals_used = (
            db.query(
                func.count(func.distinct(Alert.hospital_id))
            ).scalar()
        )

        # Average AI confidence score
        average_confidence_score = (
            db.query(
                func.avg(Prediction.confidence_score)
            ).scalar()
        )

        if average_confidence_score is None:
            average_confidence_score = 0
        else:
            average_confidence_score = round(
                float(average_confidence_score),
                2
            )

        # Critical accidents
        critical_accidents = (
            db.query(func.count(Prediction.id))
            .filter(
                Prediction.predicted_severity == "CRITICAL"
            )
            .scalar()
        )

        # High accidents
        high_accidents = (
            db.query(func.count(Prediction.id))
            .filter(
                Prediction.predicted_severity == "HIGH"
            )
            .scalar()
        )

        return {
            "total_accidents": total_accidents,
            "total_alerts": total_alerts,
            "total_hospitals_used": total_hospitals_used,
            "average_confidence_score": average_confidence_score,
            "critical_accidents": critical_accidents,
            "high_accidents": high_accidents
        }

    @staticmethod
    def get_severity_distribution(db: Session):

        distribution = (
            db.query(
                Prediction.predicted_severity,
                func.count(Prediction.id)
            )
            .group_by(Prediction.predicted_severity)
            .all()
        )

        result = {
            "LOW": 0,
            "MEDIUM": 0,
            "HIGH": 0,
            "CRITICAL": 0
        }

        for severity, count in distribution:
            result[severity] = count

        return result

    @staticmethod
    def get_hospital_usage(db: Session):

        usage = (
            db.query(
                Hospital.name,
                func.count(Alert.id)
            )
            .join(
                Alert,
                Hospital.id == Alert.hospital_id
            )
            .group_by(Hospital.name)
            .all()
        )

        result = []

        for hospital_name, total_alerts in usage:
            result.append({
                "hospital_name": hospital_name,
                "total_alerts": total_alerts
            })

        return result

    @staticmethod
    def get_alert_analytics(db: Session):

        total_alerts = db.query(func.count(Alert.id)).scalar()

        critical_alerts = (
            db.query(func.count(Alert.id))
            .join(
                Prediction,
                Alert.accident_id == Prediction.accident_id
            )
            .filter(
                Prediction.predicted_severity == "CRITICAL"
            )
            .scalar()
        )

        high_alerts = (
            db.query(func.count(Alert.id))
            .join(
                Prediction,
                Alert.accident_id == Prediction.accident_id
            )
            .filter(
                Prediction.predicted_severity == "HIGH"
            )
            .scalar()
        )

        return {
            "total_alerts": total_alerts,
            "critical_alerts": critical_alerts,
            "high_alerts": high_alerts
        }
    @staticmethod
    def get_recent_activity(db: Session):

        activity = (
            db.query(
                Accident.id,
                Prediction.predicted_severity,
                Hospital.name,
                Alert.status,
                Accident.reported_at
        )
            .join(
                Prediction,
                Accident.id == Prediction.accident_id
        )
            .join(
                Alert,
                Accident.id == Alert.accident_id
        )
            .join(
                Hospital,
                Alert.hospital_id == Hospital.id
        )
            .order_by(
                Accident.reported_at.desc()
        )
            .limit(10)
            .all()
    )

        result = []

        for accident_id, severity, hospital_name, alert_status, created_at in activity:
            result.append({
            "accident_id": accident_id,
            "severity": severity,
            "hospital_name": hospital_name,
            "alert_status": alert_status,
            "timestamp": created_at
        })

        return result