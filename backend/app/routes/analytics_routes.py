from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.analytics_service import AnalyticsService

router = APIRouter()


@router.get("/analytics/summary")
def get_summary(db: Session = Depends(get_db)):
    return AnalyticsService.get_summary(db)


@router.get("/analytics/severity-distribution")
def get_severity_distribution(db: Session = Depends(get_db)):
    return AnalyticsService.get_severity_distribution(db)


@router.get("/analytics/hospital-usage")
def get_hospital_usage(db: Session = Depends(get_db)):
    return AnalyticsService.get_hospital_usage(db)

@router.get("/analytics/alert-analytics")
def get_alert_analytics(db: Session = Depends(get_db)):
    return AnalyticsService.get_alert_analytics(db)

@router.get("/analytics/recent-activity")
def get_recent_activity(
    db: Session = Depends(get_db)
):
    return AnalyticsService.get_recent_activity(db)