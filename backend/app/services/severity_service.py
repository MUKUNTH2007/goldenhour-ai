def predict_severity(description: str):

    description = description.lower()

    score = 10

    critical_keywords = [
        "unconscious",
        "not breathing",
        "head injury",
        "brain injury",
        "cardiac arrest",
        "severe trauma"
    ]

    high_keywords = [
        "heavy bleeding",
        "multiple fractures",
        "chest injury",
        "serious injury",
        "internal bleeding"
    ]

    medium_keywords = [
        "fracture",
        "broken arm",
        "broken leg",
        "deep wound",
        "moderate bleeding"
    ]

    low_keywords = [
        "scratch",
        "minor cut",
        "bruise",
        "small wound"
    ]

    for keyword in critical_keywords:
        if keyword in description:
            score += 90

    for keyword in high_keywords:
        if keyword in description:
            score += 70

    for keyword in medium_keywords:
        if keyword in description:
            score += 40

    for keyword in low_keywords:
        if keyword in description:
            score += 10

    score = min(score, 100)

    if score >= 81:
        severity = "CRITICAL"
    elif score >= 61:
        severity = "HIGH"
    elif score >= 31:
        severity = "MEDIUM"
    else:
        severity = "LOW"

    return {
        "score": score,
        "severity": severity
    }

print(
    predict_severity(
        "Patient unconscious with severe head injury"
    )
)

print(
    predict_severity(
        "Heavy bleeding from chest injury"
    )
)

print(
    predict_severity(
        "Broken leg with moderate bleeding"
    )
)

print(
        predict_severity(
        "Minor scratch on hand"
    )
)
